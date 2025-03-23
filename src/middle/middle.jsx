import React from "react";
import { Input, Dropdown, Menu } from "antd";

const contextMenu = (
	<Menu>
		<Menu.Item key="copy">复制</Menu.Item>
		<Menu.Item key="rename">重命名</Menu.Item>
		<Menu.Item key="delete">删除</Menu.Item>
	</Menu>
);

export default function Middle({ inputList }) {
	return (
		<Dropdown overlay={contextMenu} trigger={["contextMenu"]}>
			<div>
				{inputList.map((value, index) => (
					<Input
						key={index}
						value={value}
						style={{
							height: "50px",
							marginBottom: "10px",
							backgroundColor: "#fff",
							color: "rgba(0, 0, 0, 0.88)",
						}}
						disabled
					/>
				))}
			</div>
		</Dropdown>
	);
}
