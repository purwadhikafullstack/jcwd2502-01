import React, { useEffect, useState } from "react";

import { Checkbox, CheckboxGroup, Input } from "@nextui-org/react";
import { axiosInstance } from "../../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { onBrand, onCategory } from "../../redux/features/products";

const ExploreProductsFilterAside = (props) => {
	const category = useSelector((state) => state.products.category);
	const brand = useSelector((state) => state.products.brand);

	const dispatch = useDispatch();
	return (
		<>
			<div className="filter-aside hidden md:block w-[20%] h-full sticky top-[150px]">
				<div className="filters-block w-full bg-background rounded-[20px] shadow-[0_0px_10px_1px_rgba(36,239,0,0.2)] p-4">
					<div className="wrapper flex flex-col gap-4">
						<div className="filter-group">
							<h5 className="font-medium mb-2">Brand</h5>
							{/* <CheckboxGroup defaultValue={brand} color="primary"> */}
							<div className="grid">
								{props.brandsData?.map((value) => {
									return (
										<Checkbox
											key={value.id}
											value={String(value.id)}
											onClick={() =>
												dispatch(
													onBrand(String(value.id))
												)
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
							{/* </CheckboxGroup> */}
						</div>
						<div className="filter-group">
							<h5 className="font-medium mb-2">Category</h5>
							{/* <CheckboxGroup color="primary"> */}
							<div>
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
							{/* </CheckboxGroup> */}
						</div>
						{/* <div className="filter-group">
							<h5 className="font-medium mb-2">Price</h5>
							<div className="price-inputs">
								<Input
									type="number"
									placeholder="Lowest"
									variant="bordered"
									min={0}
									className="my-2"
									startContent={
										<div className="pointer-events-none flex items-center">
											<span className="text-default-400 font-medium">
												Rp
											</span>
										</div>
									}
								/>
								<Input
									type="number"
									placeholder="Highest"
									variant="bordered"
									min={0}
									className="my-2"
									startContent={
										<div className="pointer-events-none flex items-center">
											<span className="text-default-400 font-medium">
												Rp
											</span>
										</div>
									}
								/>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default ExploreProductsFilterAside;
