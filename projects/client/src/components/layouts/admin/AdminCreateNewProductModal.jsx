import React from "react";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	Textarea,
	useDisclosure,
} from "@nextui-org/react";
import Media from "react-media";

const AdminCreateNewProductModal = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<Media
			queries={{
				medium: "(min-width: 768px)",
			}}
		>
			{(matches) => (
				<>
					<Button color="secondary" size="md" onPress={onOpen}>
						<p className="font-medium text-white flex items-center gap-1">
							<span className="text-[20px]">+</span>
							<span>Add New Product</span>
						</p>
					</Button>
					<Modal
						isOpen={isOpen}
						onOpenChange={onOpenChange}
						placement={matches.medium ? "center" : "bottom"}
						scrollBehavior="inside"
						size={matches.medium ? "2xl" : "full"}
					>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex justify-center">
										<h2 className="text-xl font-bold mb-2">
											Add New Product
										</h2>
									</ModalHeader>
									<ModalBody>
										<form className="flex flex-col gap-4 h-full">
											<div className="form-control">
												<Input
													type="text"
													name="warehouse_name"
													label="Warehouse's Name"
													labelPlacement="outside"
													variant="bordered"
													radius="sm"
													size="lg"
													placeholder="Warehouse One"
													defaultValue={"Warehouse 1"}
													isRequired
													// onChange={(e) =>
													// 	setName(e.target.value)
													// }
												/>
											</div>
											<div className="form-control">
												<Select
													name="province_id"
													label="Province"
													labelPlacement="outside"
													variant="bordered"
													radius="sm"
													size="lg"
													// onChange={(e) =>
													// 	handleProvince(
													// 		e.target.value
													// 	)
													// }
													placeholder="Select a province"
													isRequired
												>
													{/* {renderProvincesOption()} */}
												</Select>
											</div>
											<div className="form-control">
												<Select
													name="city_id"
													label="City"
													labelPlacement="outside"
													variant="bordered"
													radius="sm"
													size="lg"
													// onChange={(e) =>
													// 	setCity(e.target.value)
													// }
													placeholder="Select a city"
													isRequired
												>
													{/* {renderCitiesOption()} */}
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
													// onChange={(e) =>
													// 	setAddress(
													// 		e.target.value
													// 	)
													// }
												/>
											</div>
										</form>
									</ModalBody>
									<ModalFooter className="justify-center">
										<Button
											color="primary"
											className="text-center mb-4"
											// isLoading={isLoading}
											fullWidth
											// onPress={() => onCreate(data)}
										>
											<span className="font-bold text-black">
												Save new warehouse
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
	);
};

export default AdminCreateNewProductModal;
