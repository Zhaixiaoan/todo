import React, { useState } from "react";
import { Layout, Divider } from "antd";
import { invoke } from "@tauri-apps/api/core";
import AsideTop from "./aside/asideTop";
import AsideMy from "./aside/asideMy";
import Middle from "./middle/middle";
import Bottom from "./middle/bottom";

// 解构 Layout 的子组件
const { Sider, Content, Footer } = Layout;
// 侧边栏样式
const siderStyle = {
	// overflow: "auto",
	height: "97vh",
	position: "sticky",
	insetInlineStart: 0,
	top: 0,
	bottom: 0,
	scrollbarWidth: "thin",
	scrollbarGutter: "stable",
	backgroundColor: "#fff",
};

function App() {
	const [inputList, setInputList] = useState([]);
	const [listId, setListId] = useState([]);


	async function handleSelectItem(id) {
		const list = await invoke("get_my_task", { taskListId: Number(id) });
		const itemList = list.map((value, index) =>
			value.task
		);
		setInputList(itemList);
		setListId(id);
	}
	const handleAddInput = (value) => {
		setInputList([...inputList, value]);
	};
	return (
		<>
			<Layout>
				<Sider style={siderStyle}>
					<div className="demo-logo-vertical" />
					<AsideTop handleSelectItem={handleSelectItem} />
					<Divider
						style={{
							borderColor: "#7cb305",
							margin: "0px",
						}}
					/>
					<AsideMy handleSelectItem={handleSelectItem} />
				</Sider>
				<Layout>
					<Content style={{ margin: "24px 16px 0" }}>
						<div
							style={{
								padding: 24,
								minHeight: 360,
								// background: colorBgContainer,
								// borderRadius: borderRadiusLG,
							}}
						>
							<Middle inputList={inputList} />
						</div>
					</Content>
					<Footer
						style={{
							textAlign: "center",
						}}
					>
						<Bottom onAddInput={handleAddInput} listId={listId} />
					</Footer>
				</Layout>
			</Layout>
		</>
	);
}

export default App;
