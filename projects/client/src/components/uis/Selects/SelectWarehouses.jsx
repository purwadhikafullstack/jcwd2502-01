import { Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWarehouse } from "../../../redux/features/products";
import { axiosInstance } from "../../../lib/axios";
import { useLocation } from "react-router-dom";

const SelectWarehouses = () => {
	const location = useLocation();
	const [warehouses, setWarehouses] = useState([]);
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
		// if()
	}, []);

	useEffect(() => {
		console.log(warehouse);
	}, [warehouse]);

	return (
		<Select
			items={warehouses}
			variant="bordered"
			className="min-w-[240px]"
			labelPlacement="outside-left"
			placeholder="Select warehouse"
			selectedKeys={warehouse ? [String(warehouse)] : []}
		>
			{(warehouse) => (
				<SelectItem
					key={warehouse.id}
					value={warehouse.id}
					onClick={() => dispatch(setWarehouse(warehouse.id))}
				>
					{warehouse.warehouse_name}
				</SelectItem>
			)}
		</Select>
	);
};

export default SelectWarehouses;
