import React, { useEffect } from "react";
import AdminPageMainContainer from "../../../components/layouts/admin/AdminPageMainContainer";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchProductAsync,
	onClear,
	setSearch,
} from "../../../redux/features/products";
import { Button, Tab, Tabs } from "@nextui-org/react";
import AdminUserListTable from "../../../components/sections/admin/AdminUserListTable";
import { Link } from "react-router-dom";
import AdminRoleUserListTable from "../../../components/sections/admin/AdminRoleUserListTable";
import AdminRoleAdminListTable from "../../../components/sections/admin/AdminRoleAdminListTable";

const AdminUserListPage = () => {
	let tabs = [
		{
			id: "users",
			label: "Users",
			content: <AdminRoleUserListTable />,
		},
		{
			id: "admins",
			label: "Admins",
			content: <AdminRoleAdminListTable />,
		},
	];

	return (
		<AdminPageMainContainer>
			<div className="admin-page-header flex justify-between gap-4 mb-6">
				<h1 className="font-bold text-title-lg">User</h1>
				<Link to={"/admin/add-product"}>
					<Button color="primary" size="md">
						<p className="font-medium text-black flex items-center gap-1">
							<span className="text-[20px]">+</span>
							<span>Add New User</span>
						</p>
					</Button>
				</Link>
			</div>
			<div className="pb-12">
				<Tabs aria-label="Dynamic tabs" items={tabs}>
					{(item) => (
						<Tab key={item.id} title={item.label}>
							{item.content}
						</Tab>
					)}
				</Tabs>
			</div>
		</AdminPageMainContainer>
	);
};

export default AdminUserListPage;
