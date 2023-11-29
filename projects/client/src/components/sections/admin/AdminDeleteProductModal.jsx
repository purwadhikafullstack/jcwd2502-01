import React, { useState } from "react";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tooltip,
	useDisclosure,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { IoTrashOutline } from "react-icons/io5";

const AdminDeleteProductModal = ({ productID, handleOnDelete }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const onDelete = async (productId) => {
		setIsLoading(true);
		toast.success("Product successfully deleted");
		handleOnDelete(productId);
	};

	return (
		<>
			<Tooltip color="danger" content="Remove product">
				<Button
					isIconOnly
					variant="light"
					className="text-lg text-danger cursor-pointer active:opacity-50"
					onPress={onOpen}
				>
					<IoTrashOutline size={24} />
				</Button>
			</Tooltip>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="center"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Warning
							</ModalHeader>
							<ModalBody>
								<p>Are you sure to delete this product?</p>
							</ModalBody>
							<ModalFooter>
								<Button variant="ghost" onPress={onClose}>
									<p className="font-medium">No</p>
								</Button>
								<Button
									isLoading={isLoading}
									className="bg-red-600"
									onClick={() => {
										onDelete(productID);
										setTimeout(() => {
											onClose();
										}, 2000);
									}}
								>
									<p className="font-medium text-white">
										Yes
									</p>
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default AdminDeleteProductModal;
