import React, { useEffect, useMemo, useState } from "react";

import { Select, SelectItem } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { onSortB } from "../../../redux/features/report";

const SelectSortByB = ({ placeholder = "Options" }) => {
	const dispatch = useDispatch();
	const [keyOrder, setKeyOrder] = useState(null);
	const orderField = useSelector((state) => state.report.orderFieldBrand);
	const orderDirection = useSelector(
		(state) => state.report.orderDirectionBrand
	);

	useEffect(() => {
		if (orderField === "brand_name" && orderDirection === "asc") {
			setKeyOrder("az");
		} else if (orderField === "brand_name" && orderDirection === "desc") {
			setKeyOrder("za");
		}
	}, [orderField, orderDirection]);

	const selectedKeys = useMemo(() => {
		return keyOrder ? [String(keyOrder)] : [];
	}, [orderField, orderDirection]);

	useEffect(() => {
		if (!orderDirection && !orderField) {
			setKeyOrder(null);
		}
	}, [orderField, orderDirection, setKeyOrder, keyOrder]);

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
				onClick={() => dispatch(onSortB("brand_name", "asc"))}
			>
				A-Z
			</SelectItem>
			<SelectItem
				key={"za"}
				value={"za"}
				onClick={() => dispatch(onSortB("brand_name", "desc"))}
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

export default SelectSortByB;
