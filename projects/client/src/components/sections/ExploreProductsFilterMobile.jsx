import React from "react";

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
	useDisclosure,
} from "@nextui-org/react";

import { IoOptionsOutline } from "react-icons/io5";

const ExploreProductsFilterMobile = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<div className="subheading-mobile min-h-[70px] flex justify-between items-center md:hidden">
				<span className="font-medium text-neutral-400">
					{`<VALUE>:NUM`} Results
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
											<RadioGroup
												defaultValue={"newest"}
												color="primary"
											>
												<Radio value={"newest"}>
													Newest
												</Radio>
												<Radio value={"az"}>A-Z</Radio>
												<Radio value={"za"}>Z-A</Radio>
												<Radio value={"high"}>
													Highest price
												</Radio>
												<Radio value={"low"}>
													Lowest price
												</Radio>
											</RadioGroup>
										</div>
										<div className="filter-group-modal">
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
										</div>
										<div className="filter-group-modal">
											<h5 className="font-medium mb-2">
												Brand
											</h5>
											<CheckboxGroup color="primary">
												<Checkbox value="logitech">
													Logitech
												</Checkbox>
												<Checkbox value="razer">
													Razer
												</Checkbox>
												<Checkbox value="steelseries">
													Steelseries
												</Checkbox>
												<Checkbox value="corsair">
													Corsair
												</Checkbox>
												<Checkbox value="fantech">
													Fantech
												</Checkbox>
												<Checkbox value="aoc">
													AOC
												</Checkbox>
											</CheckboxGroup>
										</div>
										<div className="filter-group-modal">
											<h5 className="font-medium mb-2">
												Category
											</h5>
											<CheckboxGroup color="primary">
												<Checkbox value="mouse">
													Mouse
												</Checkbox>
												<Checkbox value="keyboard">
													Keyboard
												</Checkbox>
												<Checkbox value="headset">
													Headset
												</Checkbox>
												<Checkbox value="controller">
													Controller
												</Checkbox>
												<Checkbox value="monitor">
													Monitor
												</Checkbox>
												<Checkbox value="mousepad">
													Mousepad
												</Checkbox>
											</CheckboxGroup>
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
