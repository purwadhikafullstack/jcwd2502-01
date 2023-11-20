import React from "react";
import AdminPageMainContainer from "../../../components/layouts/admin/AdminPageMainContainer";
import { Tab, Tabs } from "@nextui-org/react";
import AdminReportTransactionListTable from "../../../components/sections/admin/AdminReportTransactionListTable";
import AdminReportCategoryListTable from "../../../components/sections/admin/AdminReportCategoryListTable";
import AdminReportBrandListTable from "../../../components/sections/admin/AdminReportBrandListTable";
import AdminReportProductListTable from "../../../components/sections/admin/AdminReportProductListTable";

const AdminSalesReportPage = () => {
	let tabs = [
		{
			id: "transactions",
			label: "Transactions",
			content: <AdminReportTransactionListTable />,
		},
		{
			id: "categories",
			label: "Categories",
			content: <AdminReportCategoryListTable />,
		},
		{
			id: "brands",
			label: "Brands",
			content: <AdminReportBrandListTable />,
		},
		{
			id: "products",
			label: "Products",
			content: <AdminReportProductListTable />,
		},
	];

	return (
		<AdminPageMainContainer>
			<div className="admin-page-header flex justify-between gap-4 mb-6">
				<div className="flex justify-between w-full">
					<div className="flex items-center">
						<h1 className="font-bold w-full text-title-lg mr-4">
							Sales Report
						</h1>
					</div>
				</div>
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

export default AdminSalesReportPage;
