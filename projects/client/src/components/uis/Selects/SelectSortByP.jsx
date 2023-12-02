import React, { useEffect, useState } from "react";

import { Select, SelectItem } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { onSortP } from "../../../redux/features/report";

const SelectSortByP = ({ placeholder = "Options" }) => {
	const dispatch = useDispatch();
	const [keyOrder, setKeyOrder] = useState(null);
	const orderField = useSelector((state) => state.report.orderFieldProduct);
	const orderDirection = useSelector(
		(state) => state.report.orderDirectionProduct
	);

	useEffect(() => {
		if (orderField === "product_name" && orderDirection === "asc") {
			setKeyOrder("az");
		} else if (orderField === "product_name" && orderDirection === "desc") {
			setKeyOrder("za");
		} else if (orderField === "" && orderDirection === "") {
			setKeyOrder(null);
		}
	}, [orderField, orderDirection]);

	useEffect(() => {
		console.log(orderDirection);
		console.log(orderField);
	}, [orderDirection, orderField]);

	return (
		<Select
			labelPlacement={"outside-left"}
			placeholder={placeholder}
			size="md"
			variant="bordered"
			className="min-w-[178px]"
			selectedKeys={keyOrder ? [String(keyOrder)] : []}
		>
			<SelectItem
				key={"az"}
				value={"az"}
				onClick={() => dispatch(onSortP("product_name", "asc"))}
			>
				A-Z
			</SelectItem>
			<SelectItem
				key={"za"}
				value={"za"}
				onClick={() => dispatch(onSortP("product_name", "desc"))}
			>
				Z-A
			</SelectItem>
		</Select>
	);
};

export default SelectSortByP;
