import { Switch } from "@nextui-org/react";
import { IoMoon, IoSunny } from "react-icons/io5";

const ThemeToggle = ({ theme, handleToggle }) => {
	return (
		<>
			<div className="fixed bottom-6 right-4 z-20">
				<Switch
					size="lg"
					color="default"
					startContent={<IoMoon />}
					endContent={<IoSunny />}
					onChange={handleToggle}
					isSelected={theme === "dark" ? true : false}
				></Switch>
			</div>
		</>
	);
};

export default ThemeToggle;
