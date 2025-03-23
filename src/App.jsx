import React, { useState } from "react";
import { Layout, Divider } from "antd";
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

	const handleAddInput = (value) => {
		setInputList([...inputList, value]);
	};
	return (
		<>
			<Layout>
				<Sider style={siderStyle}>
					<div className="demo-logo-vertical" />
					<AsideTop />
					<Divider
						style={{
							borderColor: "#7cb305",
							margin: "0px",
						}}
					/>
					<AsideMy />
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
						<Bottom onAddInput={handleAddInput} />
					</Footer>
				</Layout>
			</Layout>
		</>
	);
}

export default App;
