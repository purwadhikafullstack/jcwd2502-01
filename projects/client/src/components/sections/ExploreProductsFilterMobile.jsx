import React from "react";

import {
	Button,
	Checkbox,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
	useDisclosure,
} from "@nextui-org/react";

import { IoOptionsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
	onBrand,
	onCategory,
	onClear,
	onSort,
} from "../../redux/features/products";
import { useNavigate } from "react-router-dom";

const ExploreProductsFilterMobile = (props) => {
	const category = useSelector((state) => state.products.category);
	const brand = useSelector((state) => state.products.brand);
	const count = useSelector((state) => state.products.count);

	const search = useSelector((state) => state.products.search);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const clear = async () => {
		await dispatch(onClear());
		navigate(`/explore${search && `?search=${search}`}`);
		window.location.reload(false);
	};

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
											<Select
												labelPlacement={"outside-left"}
												size="md"
												variant="bordered"
												className="min-w-[178px]"
												placeholder="Options"
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
											onPress={() => clear()}
											variant="bordered"
											fullWidth
										>
											{`Clear Filter(s)`}
										</Button>
										<Button
											className="bg-primary-500 text-black font-medium"
											onPress={onClose}
											fullWidth
										>
											Apply
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
