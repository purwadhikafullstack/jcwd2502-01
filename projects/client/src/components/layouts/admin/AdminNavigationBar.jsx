import React, { useEffect } from "react";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Button,
} from "@nextui-org/react";

import { useStateContext } from "../../../contexts/ContextProvider";
import ProfileDropdown from "../../uis/Dropdowns/ProfileDropdown";
import { IoMenu } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import NexocompLogo from "../../../assets/logo/NexocompLogo";

const AdminNavigationBar = () => {
	const location = useLocation();

	const { activeMenu, setActiveMenu, screenSize, setScreenSize } =
		useStateContext();

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);
		handleResize();
	}, [screenSize]);

	useEffect(() => {
		if (screenSize <= 900) {
			setActiveMenu(false);
		} else {
			setActiveMenu(true);
		}
	}, [screenSize]);

	useEffect(() => {
		console.log("PATHNAME", location.pathname);
	}, []);

	return (
		<Navbar
			isBlurred={false}
			className={`w-full py-2 bg-background`}
			maxWidth="full"
		>
			<NavbarBrand>
				{location.pathname === "/admin/add-product" ||
				location.pathname === "/admin/edit-product" ? (
					<Link to={"/admin/home"}>
						<div className="-mb-1.5 w-full">
							<NexocompLogo
								width={160}
								fill={"fill-primary-500"}
							/>
						</div>
					</Link>
				) : (
					<Button
						isIconOnly
						variant="light"
						size="sm"
						onClick={() =>
							setActiveMenu((prevActiveMenu) => !prevActiveMenu)
						}
					>
						<IoMenu size={24} />
					</Button>
				)}
			</NavbarBrand>
			<NavbarContent justify="end">
				<NavbarItem className="flex">
					<ProfileDropdown />
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
};

export default AdminNavigationBar;
