import React from "react";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
	Checkbox,
	User,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { onBrand } from "../../../redux/features/products";

const SelectProductBrands = ({ brands }) => {
	const dispatch = useDispatch();

	return (
		<Dropdown placement="bottom-end">
			<DropdownTrigger>
				<Button>Select Brands</Button>
			</DropdownTrigger>
			<DropdownMenu
				aria-label="User Actions"
				variant="flat"
				closeOnSelect={false}
			>
				{brands?.map((value) => {
					return (
						<DropdownItem key={value?.brand_name}>
							<Checkbox
								key={value?.id}
								value={String(value?.id)}
								// onClick={() =>
								// 	dispatch(onBrand(String(value?.id)))
								// }
								// defaultSelected={value?.includes(
								// 	String(value?.id)
								// )}
							>
								{value?.brand_name}
							</Checkbox>
						</DropdownItem>
					);
				})}
			</DropdownMenu>
		</Dropdown>
	);
};

export default SelectProductBrands;