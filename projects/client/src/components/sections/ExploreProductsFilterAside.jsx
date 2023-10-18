import React from "react";

import { Checkbox, CheckboxGroup, Input } from "@nextui-org/react";

const ExploreProductsFilterAside = () => {
	return (
		<>
			<div className="filter-aside hidden md:block w-[20%] h-full sticky top-[150px]">
				<div className="filters-block w-full bg-background rounded-[20px] shadow-[0_0_10px_1px_rgba(36,239,0,0.4)] dark:shadow-[0_0_10px_1px_rgba(58,55,82,0.4)] p-4">
					<div className="wrapper flex flex-col gap-4">
						<div className="filter-group">
							<h5 className="font-medium mb-2">Brand</h5>
							<CheckboxGroup color="primary">
								<Checkbox value="logitech">Logitech</Checkbox>
								<Checkbox value="razer">Razer</Checkbox>
								<Checkbox value="steelseries">
									Steelseries
								</Checkbox>
								<Checkbox value="corsair">Corsair</Checkbox>
								<Checkbox value="fantech">Fantech</Checkbox>
								<Checkbox value="aoc">AOC</Checkbox>
							</CheckboxGroup>
						</div>
						<div className="filter-group">
							<h5 className="font-medium mb-2">Category</h5>
							<CheckboxGroup color="primary">
								<Checkbox value="mouse">Mouse</Checkbox>
								<Checkbox value="keyboard">Keyboard</Checkbox>
								<Checkbox value="headset">Headset</Checkbox>
								<Checkbox value="controller">
									Controller
								</Checkbox>
								<Checkbox value="monitor">Monitor</Checkbox>
								<Checkbox value="mousepad">Mousepad</Checkbox>
							</CheckboxGroup>
						</div>
						<div className="filter-group">
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
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ExploreProductsFilterAside;
