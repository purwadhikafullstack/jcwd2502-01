import { Button, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../uis/Buttons/ThemeToggle";

const NavigationBarMenu = () => {
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
	);

	const handleToggle = (e) => {
		if (e.target.checked) {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	};

	useEffect(() => {
		localStorage.setItem("theme", theme);
		const localTheme = localStorage.getItem("theme");
		document.querySelector("html").setAttribute("class", localTheme);
	}, [theme]);

	return (
		<>
			<NavbarMenu className="pt-4">
				<NavbarMenuItem>
					<div className="flex justify-between gap-2">
						<Link to={"/login"} className="w-full">
							<Button
								variant="ghost"
								color="primary"
								className="font-medium text-text"
								fullWidth
							>
								Login
							</Button>
						</Link>
						<Link to={"/signup"} className="w-full">
							<Button
								className="bg-primary-500 text-black font-medium"
								fullWidth
							>
								Sign Up
							</Button>
						</Link>
					</div>
				</NavbarMenuItem>
				<NavbarMenuItem className="mb-4 text-right">
					<div className="flex justify-between items-center">
						<p>Change Theme</p>
						<ThemeToggle
							handleToggle={handleToggle}
							theme={theme}
						/>
					</div>
				</NavbarMenuItem>
				<NavbarMenuItem className="mt-auto mb-8">
					<Button className="bg-red-500" fullWidth>
						<span className="text-white font-medium">Logout</span>
					</Button>
				</NavbarMenuItem>
			</NavbarMenu>
		</>
	);
};

export default NavigationBarMenu;
