import React from "react";
import { Menu, Dropdown } from "antd";
import {
	UploadOutlined,
	BarChartOutlined,
	PlusOutlined,
} from "@ant-design/icons";
// 左侧下层菜单项
const leftBottomItems = [UploadOutlined, BarChartOutlined].map(
	(icon, index) => ({
		key: `left-bottom-${index + 1}`,
		icon: React.createElement(icon),
		label: `Bottom ${index + 1}`,
	})
);

const contextMenu = (
	<Menu>
		<Menu.Item key="copy">复制</Menu.Item>
		<Menu.Item key="rename">重命名</Menu.Item>
		<Menu.Item key="delete">删除</Menu.Item>
	</Menu>
);
export default function AsideMy() {
	const [items, setItems] = React.useState(leftBottomItems);
	const [editingKey, setEditingKey] = React.useState(null);

	const handleAdd = () => {
		const newItem = {
			key: `new-item-${Date.now()}`,
			label: "",
			icon: React.createElement(BarChartOutlined),
			editable: true,
		};
		setItems([...items, newItem]);
		setEditingKey(newItem.key);
	};

	const handleEdit = (e, key) => {
		const newItems = items.map((item) =>
			item.key === key ? { ...item, label: e.target.value } : item
		);
		setItems(newItems);
	};

	const handleBlur = (key) => {
		setEditingKey(null);
		// 如果内容为空，则移除该项
		const item = items.find((item) => item.key === key);
		if (item && !item.label.trim()) {
			setItems(items.filter((item) => item.key !== key));
		}
	};

	const lastItems = [
		{
			key: "left-bottom-new",
			icon: React.createElement(PlusOutlined),
			label: "新增列表",
			onClick: handleAdd,
		},
	];

	return (
		<>
			<div style={{ height: "66vh", backgroundColor: "#fff" }}>
				<Dropdown overlay={contextMenu} trigger={["contextMenu"]}>
					<Menu
						theme="light"
						mode="inline"
						defaultSelectedKeys={["left-bottom-1"]}
						icon={React.createElement(BarChartOutlined)}
					>
						{items.map((item) => (
							<Menu.Item key={item.key} icon={item.icon}>
								{editingKey === item.key ? (
									<input
										autoFocus
										value={item.label}
										onChange={(e) => handleEdit(e, item.key)}
										onBlur={() => handleBlur(item.key)}
										onKeyPress={(e) => {
											if (e.key === "Enter") {
												handleBlur(item.key);
											}
										}}
									/>
								) : (
									item.label
								)}
							</Menu.Item>
						))}
					</Menu>
				</Dropdown>
			</div>
			<Menu
				theme="light"
				mode="inline"
				defaultSelectedKeys={["left-bottom"]}
				items={lastItems}
			/>
		</>
	);
}
