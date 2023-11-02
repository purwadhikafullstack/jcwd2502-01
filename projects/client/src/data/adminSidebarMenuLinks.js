import { GoHome } from "react-icons/go";
import { TbBuildingWarehouse, TbCategory2, TbReceipt } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { IoAppsOutline, IoCartOutline } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";

export const adminSidebarMenuLinks = (role) => {
	if (role === "super") {
		return [
			{
				name: "Home",
				icon: <GoHome size={24} className="stroke-[.4]" />,
				path: "/admin/home",
			},
			{
				name: "Warehouses",
				icon: <TbBuildingWarehouse size={24} />,
				path: "/admin/warehouses",
			},
			{
				name: "Users",
				icon: <FiUsers size={24} />,
				path: "/admin/users",
			},
			{
				name: "Orders",
				icon: <IoCartOutline size={24} />,
				path: "/admin/orders",
			},
			{
				name: "Products",
				icon: <IoAppsOutline size={24} />,
				path: "/admin/products",
			},
			{
				name: "Categories",
				icon: <TbCategory2 size={24} />,
				path: "/admin/categories",
			},
			{
				name: "Mutations",
				icon: <TbReceipt size={24} />,
				path: "/admin/mutations",
			},
			{
				name: "Reports",
				icon: <MdQueryStats size={24} />,
				path: "/admin/reports",
			},
		];
	} else {
		return [
			{
				name: "Home",
				icon: <GoHome size={24} className="stroke-[.4]" />,
				path: "/admin/home",
			},
			{
				name: "Orders",
				icon: <IoCartOutline size={24} />,
				path: "/admin/orders",
			},
			{
				name: "Products",
				icon: <IoAppsOutline size={24} />,
				path: "/admin/products",
			},
			{
				name: "Categories",
				icon: <TbCategory2 size={24} />,
				path: "/admin/categories",
			},
			{
				name: "Mutations",
				icon: <TbReceipt size={24} />,
				path: "/admin/mutations",
			},
			{
				name: "Reports",
				icon: <MdQueryStats size={24} />,
				path: "/admin/reports",
			},
		];
	}
};
