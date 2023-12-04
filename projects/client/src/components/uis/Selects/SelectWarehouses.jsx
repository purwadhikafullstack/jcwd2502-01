import { Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWarehouse } from "../../../redux/features/products";
import { axiosInstance } from "../../../lib/axios";

const SelectWarehouses = () => {
	const [warehouses, setWarehouses] = useState([]);
	const warehouse = useSelector((state) => state.products.warehouse);
	const role = useSelector((state) => state.user.role);
	const accessToken = localStorage.getItem("accessToken");

	const dispatch = useDispatch();

	const fetchWarehouses = async () => {
		try {
			const { data } = await axiosInstance(accessToken).get(
				`warehouses/all`
			);
			setWarehouses(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchWarehouses();
	}, []);

	return (
		<Select
			items={warehouses}
			variant="bordered"
			className="min-w-[240px]"
			labelPlacement="outside-left"
			placeholder="Select warehouse"
			selectedKeys={warehouse ? [String(warehouse)] : []}
			isDisabled={role !== "super"}
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
