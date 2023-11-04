import React from "react";
import { adminSidebarMenuLinks } from "../../../data/adminSidebarMenuLinks";
import { NavLink } from "react-router-dom";
import NexocompLogo from "../../../assets/logo/NexocompLogo";
import { Button } from "@nextui-org/react";
import { IoClose } from "react-icons/io5";
import { useStateContext } from "../../../contexts/ContextProvider";

const AdminSidebarMenu = () => {
	const { activeMenu, setActiveMenu, screenSize } = useStateContext();

	const handleCloseSidebar = () => {
		if (activeMenu && screenSize <= 900) {
			setActiveMenu(false);
		}
	};

	const activeLink =
		"flex items-center gap-3 text-lg text-black font-medium px-4 py-2 rounded-xl bg-primary-500 duration-150";
	const inactiveLink =
		"flex items-center gap-3 text-lg dark:text-white font-medium px-4 py-2 rounded-xl hover:bg-secondary-100 dark:hover:bg-secondary-500 duration-150";

	return (
		<nav
			className={`admin-sidebar-menu w-72 p-4 py-8 h-full fixed bg-background border-r-2 border-primary-100 dark:border-primary-900 duration-300 z-[99999] ${
				activeMenu ? "left-0" : "-left-[320px]"
			}`}
		>
			<div className="flex justify-between items-center ml-2">
				<NexocompLogo width={160} fill={"fill-primary-500 mt-2"} />
				<Button
					isIconOnly
					variant="light"
					radius="full"
					size="sm"
					onClick={() =>
						setActiveMenu((prevActiveMenu) => !prevActiveMenu)
					}
				>
					<IoClose size={20} className="fill-neutral-500" />
				</Button>{" "}
			</div>
			<div className="link-list flex flex-col gap-4 mt-8">
				{adminSidebarMenuLinks("super")?.map((link) => {
					return (
						<NavLink
							to={link.path}
							key={link.name}
							onClick={handleCloseSidebar}
							className={({ isActive }) =>
								isActive ? activeLink : inactiveLink
							}
						>
							{link.icon}
							<span>{link.name}</span>
						</NavLink>
					);
				})}
			</div>
		</nav>
	);
};

export default AdminSidebarMenu;
