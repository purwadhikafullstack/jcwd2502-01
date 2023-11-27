import React, { useEffect, useState } from "react";

import { Select, SelectItem } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { onSortC } from "../../../redux/features/report";

const SelectSortByC = ({ placeholder = "Options" }) => {
	const dispatch = useDispatch();
	const [keyOrder, setKeyOrder] = useState(null);
	const orderField = useSelector((state) => state.report.orderFieldCategory);
	const orderDirection = useSelector(
		(state) => state.report.orderDirectionCategory
	);

	useEffect(() => {
		if (orderField === "category_type" && orderDirection === "asc") {
			setKeyOrder("az");
		} else if (
			orderField === "category_type" &&
			orderDirection === "desc"
		) {
			setKeyOrder("za");
		} //else if (
		// 	orderField === "product_price" &&
		// 	orderDirection === "desc"
		// ) {
		// 	setKeyOrder("high");
		// } else if (orderField === "product_price" && orderDirection === "asc") {
		// 	setKeyOrder("low");
		// } else if (orderField === "updatedAt" && orderDirection === "desc") {
		// 	setKeyOrder("last_updated");
		// }
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
				onClick={() => dispatch(onSortC("category_type", "asc"))}
			>
				A-Z
			</SelectItem>
			<SelectItem
				key={"za"}
				value={"za"}
				onClick={() => dispatch(onSortC("category_type", "desc"))}
			>
				Z-A
			</SelectItem>
			{/* <SelectItem
				key={"high"}
				value={"high"}
				onClick={() => dispatch(onSort("product_price", "desc"))}
			>
				Highest price
			</SelectItem>
			<SelectItem
				key={"low"}
				value={"low"}
				onClick={() => dispatch(onSort("product_price", "asc"))}
			>
				Lowest price
			</SelectItem>
			{admin ? (
				<SelectItem
					key={"last_updated"}
					value={"last_updated"}
					onClick={() => dispatch(onSort("updatedAt", "desc"))}
				>
					Last updated
				</SelectItem>
			) : null} */}
		</Select>
	);
};

export default SelectSortByC;
