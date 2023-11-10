import { Switch } from "@nextui-org/react";
import { IoMoon, IoSunny } from "react-icons/io5";

const ThemeToggle = ({ theme, handleToggle, display }) => {
	return (
		<div
			className={`md:fixed md:bottom-6 md:right-4 md:z-20 ${display} items-center`}
		>
			<Switch
				size="lg"
				color="default"
				startContent={<IoMoon />}
				endContent={<IoSunny />}
				onChange={handleToggle}
				className="-mr-2 md:-mr-0"
				isSelected={theme === "dark" ? true : false}
			></Switch>
		</div>
	);
};

export default ThemeToggle;
