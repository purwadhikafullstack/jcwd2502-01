import React from "react";
import AdminPageMainContainer from "../../../components/layouts/admin/AdminPageMainContainer";
import { Tab, Tabs } from "@nextui-org/react";
import AdminStocksListTable from "../../../components/sections/admin/AdminStocksListTable";
import AdminIncomingStocksTable from "../../../components/sections/admin/AdminIncomingStocksTable";
import AdminOutgoingStocksTable from "../../../components/sections/admin/AdminOutgoingStocksTable";
import SelectWarehouses from "../../../components/uis/Selects/SelectWarehouses";

const AdminStocksListPage = () => {
	let tabs = [
		{
			id: "stocks",
			label: "Stocks",
			content: <AdminStocksListTable />,
		},
		{
			id: "incoming",
			label: "Incoming",
			content: <AdminIncomingStocksTable />,
		},
		{
			id: "outgoing",
			label: "Outgoing",
			content: <AdminOutgoingStocksTable />,
		},
	];

	return (
		<AdminPageMainContainer>
			<div className="admin-page-header flex justify-between gap-4 mb-6">
				<div className="flex justify-between w-full">
					<div className="flex items-center">
						<h1 className="font-bold text-title-lg mr-4">Stocks</h1>
						<SelectWarehouses />
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

export default AdminStocksListPage;
