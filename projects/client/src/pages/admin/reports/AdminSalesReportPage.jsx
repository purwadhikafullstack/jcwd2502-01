import React, { useEffect, useState } from "react";
import AdminPageMainContainer from "../../../components/layouts/admin/AdminPageMainContainer";
import { Tab, Tabs } from "@nextui-org/react";
import AdminReportTransactionListTable from "../../../components/sections/admin/AdminReportTransactionListTable";
import AdminReportCategoryListTable from "../../../components/sections/admin/AdminReportCategoryListTable";
import AdminReportBrandListTable from "../../../components/sections/admin/AdminReportBrandListTable";
import AdminReportProductListTable from "../../../components/sections/admin/AdminReportProductListTable";
import { useLocation, useNavigate } from "react-router-dom";

const AdminSalesReportPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [key, setKey] = useState("");
	const takeFromQuery = () => {
		const queryParams = new URLSearchParams(location.search);
		const selectedTabs = queryParams.get("tab");
		if (selectedTabs) {
			setKey(selectedTabs);
		}
	};

	const onTab = (value) => {
		navigate(`/admin/reports?tab=${value}`);
		setKey(value);
	};

	useEffect(() => {
		takeFromQuery();
	}, [key, setKey, location]);

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
				<Tabs
					aria-label="Dynamic tabs"
					items={tabs}
					defaultSelectedKey={key}
				>
					{(item) => (
						<Tab
							key={item.id}
							title={item.label}
							id={`/admin/reports?tab=${item.id}`}
						>
							{item.content}
						</Tab>
					)}
				</Tabs>
			</div>
		</AdminPageMainContainer>
	);
};

export default AdminSalesReportPage;
