import React from "react";

import Media from "react-media";

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Input,
	Select,
	SelectItem,
	Textarea,
	Checkbox,
} from "@nextui-org/react";

const CreateNewAddressModal = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<Media
				queries={{
					medium: "(min-width: 768px)",
				}}
			>
				{(matches) => (
					<>
						<Button
							color="secondary"
							size={matches.medium ? "lg" : "md"}
							onPress={onOpen}
							fullWidth
						>
							<p className="font-medium text-white flex items-center gap-1">
								<span className="text-[24px]">+</span>
								<span>Add New Address</span>
							</p>
						</Button>
						<Modal
							isOpen={isOpen}
							onOpenChange={onOpenChange}
							placement={matches.medium ? "center" : "bottom"}
							scrollBehavior="inside"
							size={matches.medium ? "2xl" : "full"}
							backdrop={matches.medium ? "blur" : ""}
						>
							<ModalContent>
								{(onClose) => (
									<>
										<ModalHeader className="flex justify-center">
											<h2 className="text-xl font-bold mb-2">
												Add New Address
											</h2>
										</ModalHeader>
										<ModalBody>
											<form className="flex flex-col justify-between gap-4 h-full">
												<div className="form-control">
													<Input
														type="text"
														name="recipient_name"
														label="Recipient's Name"
														labelPlacement="outside"
														variant="bordered"
														radius="sm"
														size="lg"
														placeholder="John Doe"
														defaultValue={
															"Albert Santoso Tandjung"
														}
														isRequired
													/>
												</div>
												<div className="form-control">
													<Select
														name="province"
														label="Province"
														labelPlacement="outside"
														variant="bordered"
														radius="sm"
														size="lg"
														onChange={(e) =>
															console.log(
																e.target.value
															)
														}
														placeholder="Select a province"
														isRequired
													>
														<SelectItem
															key={[
																`province.id`,
																`province.province`,
															]}
														>
															{`province.province`}
														</SelectItem>
														<SelectItem
															key={[1, "Bali"]}
														>
															Bali
														</SelectItem>
														<SelectItem
															key={[
																2,
																"Bangka Belitung",
															]}
														>
															Bangka Belitung
														</SelectItem>
														<SelectItem
															key={[3, "Banten"]}
														>
															Banten
														</SelectItem>
													</Select>
												</div>
												<div className="form-control">
													<Select
														name="city"
														label="City"
														labelPlacement="outside"
														variant="bordered"
														radius="sm"
														size="lg"
														onChange={(e) =>
															console.log(
																e.target.value
															)
														}
														placeholder="Select a City"
														isRequired
													>
														<SelectItem
															key={[
																`city.id`,
																`city.type`,
																`city.city_name`,
															]}
														>
															{`city.type`}{" "}
															{`city.city_name`}
														</SelectItem>
														<SelectItem
															key={[
																455,
																`Kabupaten`,
																`Tangerang`,
															]}
														>
															{`Kabupaten`}{" "}
															{`Tangerang`}
														</SelectItem>
														<SelectItem
															key={[
																456,
																`Kota`,
																`Tangerang`,
															]}
														>
															{`Kota`}{" "}
															{`Tangerang`}
														</SelectItem>
													</Select>
												</div>
												<div className="form-control">
													<Textarea
														placeholder="Jl. Street Address"
														name="full_address"
														label="Full Address"
														labelPlacement="outside"
														variant="bordered"
														radius="sm"
														size="lg"
														isRequired
													/>
												</div>
												<div className="form-control">
													<Checkbox>
														<span className="font-medium">
															Set this as the main
															address
														</span>
													</Checkbox>
												</div>
											</form>
										</ModalBody>
										<ModalFooter className="justify-center">
											<Button
												color="primary"
												className="text-center mb-4"
												onPress={onClose}
												fullWidth
											>
												<span className="font-bold text-black">
													Save new address
												</span>
											</Button>
										</ModalFooter>
									</>
								)}
							</ModalContent>
						</Modal>
					</>
				)}
			</Media>
		</>
	);
};

export default CreateNewAddressModal;
