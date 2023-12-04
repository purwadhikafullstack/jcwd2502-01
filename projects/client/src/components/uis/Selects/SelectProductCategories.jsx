import {
	Button,
	Checkbox,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onCategory } from "../../../redux/features/products";
import { axiosInstance } from "../../../lib/axios";

const SelectProductCategories = (props) => {
	const [categoriesList, setCategoriesList] = useState([]);
	const category = useSelector((state) => state.products.category);

	const dispatch = useDispatch();

	const fetchCategoriesAsync = async () => {
		try {
			const { data } = await axiosInstance().get(`categories/all`);
			setCategoriesList(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchCategoriesAsync();
	}, []);

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
				{categoriesList?.map((value) => {
					return (
						<DropdownItem key={value?.category_type}>
							<Checkbox
								key={value.id}
								value={value.id}
								onClick={() =>
									dispatch(onCategory(String(value.id)))
								}
								defaultSelected={category.includes(
									String(value.id)
								)}
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
