import { GoHome } from "react-icons/go";
import {
	TbBuildingWarehouse,
	TbCategory2,
	TbReceipt,
	TbStars,
} from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { IoAppsOutline } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { BiHash } from "react-icons/bi";
import { PiShoppingCartBold } from "react-icons/pi";

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
				icon: <PiShoppingCartBold size={24} />,
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
				name: "Brands",
				icon: <TbStars size={24} />,
				path: "/admin/brands",
			},
			{
				name: "Stocks",
				icon: <BiHash size={24} />,
				path: "/admin/stocks",
			},
			{
				name: "Stock History",
				icon: <TbReceipt size={24} />,
				path: "/admin/stock-history",
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
				icon: <PiShoppingCartBold size={24} />,
				path: "/admin/orders",
			},
			{
				name: "Products",
				icon: <IoAppsOutline size={24} />,
				path: "/admin/products",
			},
			{
				name: "Stocks",
				icon: <BiHash size={24} />,
				path: "/admin/stocks",
			},
			{
				name: "Stock History",
				icon: <TbReceipt size={24} />,
				path: "/admin/stock-history",
			},
			{
				name: "Reports",
				icon: <MdQueryStats size={24} />,
				path: "/admin/reports",
			},
		];
	}
};
