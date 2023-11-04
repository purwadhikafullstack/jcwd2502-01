import {
	Button,
	Checkbox,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import { useDispatch } from "react-redux";
import { onCategory } from "../../../redux/features/products";

const SelectProductCategories = ({ categories }) => {
	const dispatch = useDispatch();

	return (
		<Dropdown placement="bottom-end">
			<DropdownTrigger>
				<Button>Select Categories</Button>
			</DropdownTrigger>
			<DropdownMenu
				aria-label="User Actions"
				variant="flat"
				closeOnSelect={false}
			>
				{categories?.map((value) => {
					return (
						<DropdownItem key={value?.category_type}>
							<Checkbox
								key={value.id}
								value={value.id}
								// onClick={() =>
								// 	dispatch(onCategory(String(value.id)))
								// }
								// defaultSelected={category.includes(
								// 	String(value.id)
								// )}
							>
								{value.category_type}
							</Checkbox>
						</DropdownItem>
					);
				})}
			</DropdownMenu>
		</Dropdown>
	);
};

export default SelectProductCategories;
