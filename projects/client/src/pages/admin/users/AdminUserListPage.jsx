import React from "react";
import AdminPageMainContainer from "../../../components/layouts/admin/AdminPageMainContainer";
import { Tab, Tabs } from "@nextui-org/react";
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
