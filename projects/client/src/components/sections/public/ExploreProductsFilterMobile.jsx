import React from "react";

import {
	Button,
	Checkbox,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";

import { IoOptionsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
	onBrand,
	onCategory,
	onClear,
	onSort,
} from "../../../redux/features/products";
import { useNavigate } from "react-router-dom";
import SelectSortBy from "../../uis/Selects/SelectSortBy";

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
			<div
				className={`subheading-mobile md:min-h-[70px] ${
					search ? "pt-0" : "pt-[70px]"
				} flex justify-between items-center md:hidden`}
			>
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
											<SelectSortBy />
										</div>
										<div className="filter-group-modal">
											<h5 className="font-medium mb-2">
												Brand
											</h5>
											<div className="flex flex-col items-start gap-2">
												{props.brandsData?.map(
													(value) => {
														return (
															<Checkbox
																key={value.id}
																// size="lg"
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
																<span className="text-base">
																	{
																		value.brand_name
																	}
																</span>
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
											<div className="flex flex-col items-start gap-2">
												{props.categoriesData?.map(
													(value) => {
														return (
															<Checkbox
																key={value.id}
																// size="lg"
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
																<span className="text-base">
																	{
																		value.category_type
																	}
																</span>
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
