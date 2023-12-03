import React, { useEffect, useState } from "react";

import { Select, SelectItem } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { onSortT } from "../../../redux/features/report";

const SelectSortByP = ({ placeholder = "Options" }) => {
	const dispatch = useDispatch();
	const [keyOrder, setKeyOrder] = useState(null);
	const orderField = useSelector(
		(state) => state.report.orderFieldTransaction
	);
	const orderDirection = useSelector(
		(state) => state.report.orderDirectionTransaction
	);

	useEffect(() => {
		if (orderField === "total_amount" && orderDirection === "asc") {
			setKeyOrder("az");
		} else if (orderField === "total_amount" && orderDirection === "desc") {
			setKeyOrder("za");
		} else if (orderField === "" && orderDirection === "") {
			setKeyOrder(null);
		}
	}, [orderField, orderDirection]);

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
				onClick={() => dispatch(onSortT("total_amount", "asc"))}
			>
				Lowest Price
			</SelectItem>
			<SelectItem
				key={"za"}
				value={"za"}
				onClick={() => dispatch(onSortT("total_amount", "desc"))}
			>
				Highest Price
			</SelectItem>
		</Select>
	);
};

export default SelectSortByP;
