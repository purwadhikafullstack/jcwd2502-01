import React from "react";
import { BiEdit } from "react-icons/bi";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tooltip,
	useDisclosure,
} from "@nextui-org/react";
const AdminEditStockModal = ({ id }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<Tooltip content="Edit product">
				<Button
					variant="light"
					onPress={onOpen}
					className="text-default-400 cursor-pointer active:opacity-50"
					startContent={<BiEdit size={24} />}
				>
					Edit
				</Button>
			</Tooltip>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="center"
				scrollBehavior="inside"
				size="2xl"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex justify-center">
								<h2 className="text-xl font-bold mb-2">
									Add Stocks
								</h2>
							</ModalHeader>
							<ModalBody>
								<form className="flex flex-col gap-4 h-full">
									<div className="form-control">
										<Input
											isReadOnly
											type="text"
											name="warehouse_name"
											label="Warehouse's Name"
											labelPlacement="outside"
											variant="bordered"
											radius="sm"
											size="lg"
											placeholder="Warehouse One"
											defaultValue={"Warehouse Name"}
											isRequired
										/>
									</div>
									<div className="form-control">
										<Input
											isReadOnly
											type="text"
											name="product_name"
											label="Product's Name"
											labelPlacement="outside"
											variant="bordered"
											radius="sm"
											size="lg"
											placeholder="Warehouse One"
											defaultValue={"Prouduct Name"}
											isRequired
										/>
									</div>
									<div className="form-control">
										<Input
											type="number"
											name="stocks"
											id="stocks_number"
											label="Stocks"
											labelPlacement="outside"
											variant="bordered"
											radius="sm"
											size="lg"
											placeholder="Warehouse One"
											// defaultValue={formik.values.stocks}
											isRequired
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
									// onPress={() => onSubmit(brandName)}
								>
									<span className="font-bold text-black">
										Save changes
									</span>
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default AdminEditStockModal;
