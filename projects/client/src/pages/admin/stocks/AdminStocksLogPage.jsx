import React, { useEffect, useState } from "react";
import AdminPageMainContainer from "../../../components/layouts/admin/AdminPageMainContainer";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchProductAsync,
	setWarehouse,
} from "../../../redux/features/products";
import { Button, Select, SelectItem } from "@nextui-org/react";
import AdminStockLogTable from "../../../components/sections/admin/AdminStockLogTable";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../lib/axios";
import MyMonthPicker from "../../../components/uis/MyMonthPicker/MyMonthPicker";

const AdminStocksLogPage = () => {
	const [warehouses, setWarehouses] = useState([]);
	const [selectedWarehouse, setSelectedWarehouse] = useState(null);
	const products = useSelector((state) => state.products.products);
	const warehouse = useSelector((state) => state.products.warehouse);

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
		fetchWarehouses();
	}, []);

	return (
		<AdminPageMainContainer>
			<div className="admin-page-header flex justify-between gap-4 mb-6">
				<div className="flex items-center">
					<h1 className="font-bold text-title-lg min-w-[160px] mr-4">
						Stock changes
					</h1>
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
						selectedKeys={warehouse ? [String(warehouse)] : []}
					>
						{(warehouse) => (
							<SelectItem key={warehouse.id}>
								{warehouse.warehouse_name}
							</SelectItem>
						)}
					</Select>
					<div className="ml-4">
						<MyMonthPicker className="min-w-[240px]" />
					</div>
				</div>
			</div>
			<div className="pb-12">
				<AdminStockLogTable />
			</div>
		</AdminPageMainContainer>
	);
};

export default AdminStocksLogPage;
