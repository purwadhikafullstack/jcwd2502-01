import React, { useEffect, useState } from "react";
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
	Checkbox,
	User,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { onBrand } from "../../../redux/features/products";
import { axiosInstance } from "../../../lib/axios";

const SelectProductBrands = (props) => {
	const [brandsList, setBrandsList] = useState([]);
	const brand = useSelector((state) => state.products.brand);

	const dispatch = useDispatch();

	const fetchBrandsAsync = async () => {
		try {
			const { data } = await axiosInstance().get(`brands/all`);
			setBrandsList(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchBrandsAsync();
	}, []);

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
				{brandsList?.map((value) => {
					return (
						<DropdownItem key={value?.brand_name}>
							<Checkbox
								key={value?.id}
								value={String(value?.id)}
								onClick={() =>
									dispatch(onBrand(String(value?.id)))
								}
								defaultSelected={brand?.includes(
									String(value?.id)
								)}
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
