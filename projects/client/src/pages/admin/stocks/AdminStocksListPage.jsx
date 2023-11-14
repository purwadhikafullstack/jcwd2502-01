import React, { useEffect, useState } from "react";
import AdminPageMainContainer from "../../../components/layouts/admin/AdminPageMainContainer";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchProductAsync,
	setWarehouse,
} from "../../../redux/features/products";
import { Button, Select, SelectItem } from "@nextui-org/react";
import AdminStocksListTable from "../../../components/sections/admin/AdminStocksListTable";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../lib/axios";

const AdminStocksListPage = () => {
	const [warehouses, setWarehouses] = useState([]);
	const [selectedWarehouse, setSelectedWarehouse] = useState(null);
	const products = useSelector((state) => state.products.products);
	const warehouse = useSelector((state) => state.products.warehouse);

	// const warehouses = [
	// 	{
	// 		id: 1,
	// 		warehouse_name: "Bandung",
	// 		warehouse_address: "jl. something 1",
	// 		city_id: 23,
	// 		province_id: 9,
	// 	},
	// 	{
	// 		id: 2,
	// 		warehouse_name: "Tangerang",
	// 		warehouse_address: "jl. something 2",
	// 		city_id: 457,
	// 		province_id: 3,
	// 	},
	// 	{
	// 		id: 3,
	// 		warehouse_name: "Jakarta",
	// 		warehouse_address: "jl. something 3",
	// 		city_id: 151,
	// 		province_id: 6,
	// 	},
	// ];

	const dispatch = useDispatch();

	const fetchWarehouses = async () => {
		try {
			const { data } = await axiosInstance().get(`warehouses/all`);
			setWarehouses(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		// dispatch(fetchProductAsync());
		fetchWarehouses();
	}, []);

	return (
		<AdminPageMainContainer>
			<div className="admin-page-header flex justify-between gap-4 mb-6">
				<div className="flex justify-between w-full">
					<div className="flex items-center">
						<h1 className="font-bold text-title-lg mr-4">Stocks</h1>
						<Select
							items={warehouses}
							size="sm"
							variant="bordered"
							className="min-w-[240px]"
							radius="lg"
							placeholder="Select warehouse"
							onChange={(e) => {
								dispatch(setWarehouse(e.target.value));
							}}
							selectedKeys={
								warehouse ? [String(warehouse)] : null
							}
						>
							{(warehouse) => (
								<SelectItem key={warehouse.id}>
									{warehouse.warehouse_name}
								</SelectItem>
							)}
						</Select>
					</div>
					<Link to={"/admin/stocks/log"}>
						<Button color="primary" size="md">
							<span className="font-medium text-black">
								Stocks Change Log
							</span>
						</Button>
					</Link>
				</div>
			</div>
			<div className="pb-12">
				<AdminStocksListTable />
			</div>
		</AdminPageMainContainer>
	);
};

export default AdminStocksListPage;
