import React from "react";
import { Menu, Dropdown } from "antd";
import { invoke } from "@tauri-apps/api/core";
import { BarChartOutlined, PlusOutlined } from "@ant-design/icons";
// // 左侧下层菜单项

const contextMenu = (
	<Menu>
		<Menu.Item key="copy">复制</Menu.Item>
		<Menu.Item key="rename">重命名</Menu.Item>
		<Menu.Item key="delete">删除</Menu.Item>
	</Menu>
);

export default function AsideMy() {
	const [editingKey, setEditingKey] = React.useState(null);
	const [items, setItems] = React.useState(null);

	// 新增：获取列表数据
	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const responses = await invoke("get_my_items");
				console.log("请求数据：", responses);
				const formattedItems = responses.map((item, index) => ({
					key: item.id,
					label: item.task_name,
					icon: React.createElement(BarChartOutlined),
					editable: false,
				}));
				setItems(formattedItems);
			} catch (error) {
				console.error("请求错误:", error);
			}
		};
		fetchData();
	}, []);

	const handleAdd = () => {
		const timestamp = Date.now();
		const newItem = {
			key: timestamp,
			label: "新建列表",
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
			return;
		}
		try {
			const task = {
				id: key,
				task_name: item.label,
				is_have: 0,
			};
			invoke("update_my_items", { task });
			console.log("到这里来");
		} catch (error) {}
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
						{items &&
							items.map((item) => (
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
