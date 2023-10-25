import React from "react";

import { Select, SelectItem } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { onSort } from "../../../redux/features/products";

const SelectSortBy = () => {
	const dispatch = useDispatch();

	return (
		<>
			<Select
				labelPlacement={"outside-left"}
				placeholder="Options"
				size="md"
				variant="bordered"
				className="min-w-[178px]"
			>
				<SelectItem
					key={"az"}
					value={"az"}
					onClick={() => dispatch(onSort("product_name", "asc"))}
				>
					A-Z
				</SelectItem>
				<SelectItem
					key={"za"}
					value={"za"}
					onClick={() => dispatch(onSort("product_name", "desc"))}
				>
					Z-A
				</SelectItem>
				<SelectItem
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
			</Select>
		</>
	);
};

export default SelectSortBy;
