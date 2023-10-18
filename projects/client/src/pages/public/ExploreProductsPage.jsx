import React from "react";

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Select,
	SelectItem,
	RadioGroup,
	Radio,
	Pagination,
	CheckboxGroup,
	Checkbox,
	Input,
} from "@nextui-org/react";

import { IoOptionsOutline } from "react-icons/io5";
import ProductCard from "../../components/uis/Cards/ProductCard";

const ExploreProductsPage = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<main className="explore-products-page py-6 relative">
				<div class="header-position sticky top-[54px] md:top-[70px] z-10 bg-background w-full">
					<header class="wall-header flex items-center min-h-[52px] my-container">
						<div class="wall-header__content flex items-center p-0 w-full justify-between">
							<h1
								class="wall-header__title css-69xvwy m-0 pt-6 pb-4 px-0"
								id=""
							>
								<span class="title_prefix absolute top-[-6px]">
									Search results for
									<br />
								</span>
								<span className="font-medium text-title-lg">
									{`<VALUE>:STR`}
								</span>
							</h1>
							<nav class="wall-header__nav mt-2 hidden md:block">
								<div className="sort-by flex items-center">
									<div className="w-full mr-2 font-medium">
										Sort by:
									</div>
									<Select
										labelPlacement={"outside-left"}
										size="md"
										variant="bordered"
										className="min-w-[178px]"
										placeholder="Options"
									>
										<SelectItem key={"az"} value={"az"}>
											A-Z
										</SelectItem>
										<SelectItem key={"za"} value={"za"}>
											Z-A
										</SelectItem>
										<SelectItem key={"high"} value={"high"}>
											Highest price
										</SelectItem>
										<SelectItem key={"low"} value={"low"}>
											Lowest price
										</SelectItem>
									</Select>
								</div>
							</nav>
						</div>
					</header>
				</div>
				<div className="result-body my-container md:flex md:py-4">
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
								<span className="font-medium text-body-md">
									Filter
								</span>
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
												<h2 className="font-bold">
													Filter
												</h2>
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
														<Radio value={"az"}>
															A-Z
														</Radio>
														<Radio value={"za"}>
															Z-A
														</Radio>
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
					<div className="filter-side hidden md:block w-[20%] h-full sticky top-[150px]">
						<div className="filters-block w-full bg-background rounded-[20px] shadow-[0_0_10px_1px_rgba(36,239,0,0.4)] dark:shadow-[0_0_10px_1px_rgba(58,55,82,0.4)] p-4">
							<div className="wrapper flex flex-col gap-4">
								<div className="filter-group">
									<h5 className="font-medium mb-2">Brand</h5>
									<CheckboxGroup color="primary">
										<Checkbox value="logitech">
											Logitech
										</Checkbox>
										<Checkbox value="razer">Razer</Checkbox>
										<Checkbox value="steelseries">
											Steelseries
										</Checkbox>
										<Checkbox value="corsair">
											Corsair
										</Checkbox>
										<Checkbox value="fantech">
											Fantech
										</Checkbox>
										<Checkbox value="aoc">AOC</Checkbox>
									</CheckboxGroup>
								</div>
								<div className="filter-group">
									<h5 className="font-medium mb-2">
										Category
									</h5>
									<CheckboxGroup color="primary">
										<Checkbox value="mouse">Mouse</Checkbox>
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
					<div className="product-list md:w-full md:pl-8">
						<div className="grid-wrapper grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4 py-4 md:py-0">
							<ProductCard />
							<ProductCard />
							<ProductCard />
							<ProductCard />
							<ProductCard />
							<ProductCard />
							<ProductCard />
							<ProductCard />
							<ProductCard />
							<ProductCard />
							<ProductCard />
							<ProductCard />
						</div>
						<div className="flex justify-center items-center py-12">
							<Pagination
								size="lg"
								showControls
								total={10}
								initialPage={1}
								color="secondary"
								variant="flat"
							/>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default ExploreProductsPage;
