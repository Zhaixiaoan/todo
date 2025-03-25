import React, { useState } from "react";
import { Input } from "antd";
import { invoke } from "@tauri-apps/api/core";

export default function Bottom({ onAddInput, listId }) {
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleKeyPress = async (e) => {
		if (e.key === "Enter") {
			await invoke("add_my_task", { task: inputValue, taskListId: Number(listId) });
			onAddInput(inputValue);
			setInputValue("");
		}
	};
	return (
		<Input
			value={inputValue}
			onChange={handleInputChange}
			onKeyPress={handleKeyPress}
			placeholder="按回车添加新输入框"
			style={{
				height: "50px",
				marginBottom: "10px",
			}}
		/>
	);
}
