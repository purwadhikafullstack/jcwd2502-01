import React from "react";
import AdminPageMainContainer from "../../../components/layouts/admin/AdminPageMainContainer";
import AdminOrderListTable from "../../../components/sections/admin/AdminOrderListTable";

const AdminOrderListPage = () => {
	return (
		<AdminPageMainContainer>
			<div className="admin-page-header flex justify-between gap-4 mb-6">
				<div className="flex justify-between w-full">
					<div className="flex items-center">
						<h1 className="font-bold text-title-lg mr-4">Orders</h1>
					</div>
				</div>
			</div>
			<div className="pb-12">
				<AdminOrderListTable />
			</div>
		</AdminPageMainContainer>
	);
};

export default AdminOrderListPage;
