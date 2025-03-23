import React, { useState } from "react";
import { Input } from "antd";

export default function Bottom({ onAddInput }) {
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
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
