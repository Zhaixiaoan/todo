import React from "react";
import { Menu } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";

// 左侧上层菜单项
const leftTopItems = [
	{ key: 1, icon: React.createElement(UserOutlined), label: "我的一天" },
	{ key: 2, icon: React.createElement(VideoCameraOutlined), label: "重要" },
	{ key: 3, icon: React.createElement(VideoCameraOutlined), label: "我的" },
];

export default function AsideTop({ handleSelectItem }) {
	return (
		<Menu
			theme="light"
			mode="inline"
			defaultSelectedKeys={["left-top-1"]}
			style={{ height: "25vh" }}
			items={leftTopItems}
			onClick={(item) => handleSelectItem(item.key)}
		/>
	);
}
