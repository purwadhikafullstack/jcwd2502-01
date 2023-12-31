import React from "react";

import { Checkbox } from "@nextui-org/react";

import { useDispatch, useSelector } from "react-redux";
import { onBrand, onCategory } from "../../../redux/features/products";

const ExploreProductsFilterAside = (props) => {
	const category = useSelector((state) => state.products.category);
	const brand = useSelector((state) => state.products.brand);
	const search = useSelector((state) => state.products.search);

	const dispatch = useDispatch();
	return (
		<div
			className={`filter-aside hidden md:block w-[20%] h-full sticky ${
				search ? "top-[160px]" : "top-[170px]"
			} `}
		>
			<div className="filters-block w-full bg-background rounded-[20px] light:border-1 light:border-primary-100 shadow-[0_0px_10px_1px_rgba(36,239,0,0.2)] p-4">
				<div className="wrapper flex flex-col gap-4">
					<div className="filter-group">
						<h5 className="font-medium mb-2">Brand</h5>
						<div className="flex flex-col items-start gap-2">
							{props.brandsData?.map((value) => {
								return (
									<Checkbox
										key={value.id}
										value={String(value.id)}
										onClick={() =>
											dispatch(onBrand(String(value.id)))
										}
										defaultSelected={brand.includes(
											String(value.id)
										)}
									>
										{value.brand_name}
									</Checkbox>
								);
							})}
						</div>
					</div>
					<div className="filter-group">
						<h5 className="font-medium mb-2">Category</h5>
						<div className="flex flex-col items-start gap-2">
							{props.categoriesData?.map((value) => {
								return (
									<Checkbox
										key={value.id}
										value={value.id}
										onClick={() =>
											dispatch(
												onCategory(String(value.id))
											)
										}
										defaultSelected={category.includes(
											String(value.id)
										)}
									>
										{value.category_type}
									</Checkbox>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExploreProductsFilterAside;
