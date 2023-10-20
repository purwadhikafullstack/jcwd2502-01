import React, { useEffect } from "react";

import {
	Button,
	Checkbox,
	CheckboxGroup,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Radio,
	RadioGroup,
	Select,
	SelectItem,
	useDisclosure,
} from "@nextui-org/react";

import { IoOptionsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../lib/axios";
import { onBrand, onCategory, onSort } from "../../redux/features/products";

const ExploreProductsFilterMobile = (props) => {
	const category = useSelector((state) => state.products.category);
	const brand = useSelector((state) => state.products.brand);
	const count = useSelector((state) => state.products.count);

	const dispatch = useDispatch();

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<div className="subheading-mobile min-h-[70px] flex justify-between items-center md:hidden">
				<span className="font-medium text-neutral-400">
					{count} Results
				</span>
				<div className="filter-mobile">
					<Button
						onPress={onOpen}
						variant="bordered"
						endContent={<IoOptionsOutline size={22} />}
					>
						<span className="font-medium text-body-md">Filter</span>
					</Button>
					<Modal
						isOpen={isOpen}
						onOpenChange={onOpenChange}
						className="m-0 rounded-none"
						placement="bottom"
						scrollBehavior="inside"
						size="full"
					>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex flex-col gap-1">
										<h2 className="font-bold">Filter</h2>
									</ModalHeader>
									<ModalBody>
										<div className="filter-group-modal">
											<h5 className="font-medium mb-2">
												Sort by
											</h5>
											{/* <RadioGroup
												defaultValue={"newest"}
												color="primary"
											>
												<Radio
													value={"az"}
													onClick={() =>
														dispatch(
															onSort(
																"product_name",
																"asc"
															)
														)
													}
												>
													A-Z
												</Radio>
												<Radio
													value={"za"}
													onClick={() =>
														dispatch(
															onSort(
																"product_name",
																"desc"
															)
														)
													}
												>
													Z-A
												</Radio>
												<Radio
													value={"high"}
													onClick={() =>
														dispatch(
															onSort(
																"product_price",
																"desc"
															)
														)
													}
												>
													Highest price
												</Radio>
												<Radio
													value={"low"}
													onClick={() =>
														dispatch(
															onSort(
																"product_price",
																"asc"
															)
														)
													}
												>
													Lowest price
												</Radio>
											</RadioGroup> */}
											<Select
												labelPlacement={"outside-left"}
												size="md"
												variant="bordered"
												className="min-w-[178px]"
												placeholder="Options"
												// onChange={(e) =>
												// 	dispatch(onSort(e.target.value))
												// }
											>
												<SelectItem
													key={"az"}
													value={"az"}
													onClick={() =>
														dispatch(
															onSort(
																"product_name",
																"asc"
															)
														)
													}
												>
													A-Z
												</SelectItem>
												<SelectItem
													key={"za"}
													value={"za"}
													onClick={() =>
														dispatch(
															onSort(
																"product_name",
																"desc"
															)
														)
													}
												>
													Z-A
												</SelectItem>
												<SelectItem
													key={"high"}
													value={"high"}
													onClick={() =>
														dispatch(
															onSort(
																"product_price",
																"desc"
															)
														)
													}
												>
													Highest price
												</SelectItem>
												<SelectItem
													key={"low"}
													value={"low"}
													onClick={() =>
														dispatch(
															onSort(
																"product_price",
																"asc"
															)
														)
													}
												>
													Lowest price
												</SelectItem>
											</Select>
										</div>
										{/* <div className="filter-group-modal">
											<h5 className="font-medium mb-2">
												Price
											</h5>
											<div className="price-inputs flex gap-2 items-center">
												<Input
													type="number"
													placeholder="Lowest"
													variant="bordered"
													min={0}
													startContent={
														<div className="pointer-events-none flex items-center">
															<span className="text-default-400 font-medium">
																Rp
															</span>
														</div>
													}
												/>
												<span>-</span>
												<Input
													type="number"
													placeholder="Highest"
													variant="bordered"
													min={0}
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
										<div className="filter-group-modal">
											<h5 className="font-medium mb-2">
												Brand
											</h5>
											<div className="grid">
												{props.brandsData?.map(
													(value) => {
														return (
															<Checkbox
																key={value.id}
																value={String(
																	value.id
																)}
																onClick={() =>
																	dispatch(
																		onBrand(
																			String(
																				value.id
																			)
																		)
																	)
																}
																defaultSelected={brand.includes(
																	String(
																		value.id
																	)
																)}
															>
																{
																	value.brand_name
																}
															</Checkbox>
														);
													}
												)}
											</div>
										</div>
										<div className="filter-group-modal">
											<h5 className="font-medium mb-2">
												Category
											</h5>
											<div className="grid">
												{props.categoriesData?.map(
													(value) => {
														return (
															<Checkbox
																key={value.id}
																value={String(
																	value.id
																)}
																onClick={() =>
																	dispatch(
																		onCategory(
																			String(
																				value.id
																			)
																		)
																	)
																}
																defaultSelected={category.includes(
																	String(
																		value.id
																	)
																)}
															>
																{
																	value.category_type
																}
															</Checkbox>
														);
													}
												)}
											</div>
										</div>
									</ModalBody>
									<ModalFooter className="justify-between">
										<Button
											onPress={onClose}
											variant="bordered"
											fullWidth
										>
											Clear
										</Button>
										<Button
											className="bg-primary-500"
											onPress={onClose}
											fullWidth
										>
											Action
										</Button>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>
				</div>
			</div>
		</>
	);
};

export default ExploreProductsFilterMobile;
