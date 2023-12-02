import React, { useEffect, useMemo, useState } from "react";

import { Select, SelectItem } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { onSortUser } from "../../../redux/features/manageUser";

const SelectSortByUser = ({ placeholder = "Options" }) => {
	const dispatch = useDispatch();
	const [keyOrder, setKeyOrder] = useState(null);
	const orderField = useSelector((state) => state.manageUsers.orderFieldUser);
	const orderDirection = useSelector(
		(state) => state.manageUsers.orderDirectionUser
	);

	useEffect(() => {
		if (orderField === "username" && orderDirection === "asc") {
			setKeyOrder("az");
		} else if (orderField === "username" && orderDirection === "desc") {
			setKeyOrder("za");
		}
	}, [orderField, orderDirection]);

	const selectedKeys = useMemo(() => {
		// console.log(">>>>>DISINI");
		return keyOrder ? [String(keyOrder)] : [];
	}, [orderField, orderDirection]);

	useEffect(() => {
		if (!orderDirection && !orderField) {
			setKeyOrder(null);
			// window.location.reload();
		}
	}, [orderField, orderDirection, setKeyOrder, keyOrder]);

	useEffect(() => {
		console.log("keyOrder changed:", keyOrder);
		console.log(orderDirection);
		console.log(orderField);
	}, [keyOrder, orderField, orderDirection]);

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
				onClick={() => dispatch(onSortUser("username", "asc"))}
			>
				A-Z
			</SelectItem>
			<SelectItem
				key={"za"}
				value={"za"}
				onClick={() => dispatch(onSortUser("username", "desc"))}
			>
				Z-A
			</SelectItem>
		</Select>
	);
};

export default SelectSortByUser;
