import React from "react";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import { axiosInstance } from "../../../lib/axios";
import toast from "react-hot-toast";

const AdminConfirmOrderModal = ({ orderId }) => {
	const token = localStorage.getItem("accessToken");
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const onConfirmOrder = async () => {
		try {
			await axiosInstance(token).post(
				`orders/admin/confirm-order/${orderId}`
			);

			toast.success("Confirm Order Success");

			window.location.reload(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Button fullWidth onPress={onOpen} className="bg-primary-500">
				<span className="font-medium text-black">Accept Order</span>
			</Button>
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
								<p>Are you sure to accept this order?</p>
							</ModalBody>
							<ModalFooter>
								<Button variant="ghost" onPress={onClose}>
									<p className="font-medium">No</p>
								</Button>
								<Button
									className="bg-primary-500"
									onPress={onClose}
									onClick={onConfirmOrder}
								>
									<p className="font-medium text-black">
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

export default AdminConfirmOrderModal;
