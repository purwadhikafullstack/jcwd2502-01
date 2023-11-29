import React, { useEffect, useState } from "react";
import AdminPageMainContainer from "../../../components/layouts/admin/AdminPageMainContainer";
import { useDispatch, useSelector } from "react-redux";
import { setWarehouse } from "../../../redux/features/products";
import { Button, Select, SelectItem, Tab, Tabs } from "@nextui-org/react";
import AdminStocksListTable from "../../../components/sections/admin/AdminStocksListTable";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../lib/axios";
import AdminIncomingStocksTable from "../../../components/sections/admin/AdminIncomingStocksTable";
import AdminOutgoingStocksTable from "../../../components/sections/admin/AdminOutgoingStocksTable";
import SelectWarehouses from "../../../components/uis/Selects/SelectWarehouses";

const AdminStocksListPage = () => {
	// const [warehouses, setWarehouses] = useState([]);
	// const warehouse = useSelector((state) => state.products.warehouse);

	// const dispatch = useDispatch();

	// const fetchWarehouses = async () => {
	// 	try {
	// 		const { data } = await axiosInstance().get(`warehouses/all`);
	// 		setWarehouses(data.data);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

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

	// useEffect(() => {
	// 	fetchWarehouses();
	// }, []);

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
