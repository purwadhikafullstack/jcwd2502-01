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

const AdminCancelOrderModal = ({ orderId }) => {
	const token = localStorage.getItem("accessToken");
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const onCancelOrder = async () => {
		try {
			await axiosInstance(token).patch(
				`orders/admin/cancel-order/${orderId}`
			);

			toast.success("Cancel Order Success");

			window.location.reload(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Button fullWidth variant="faded" onPress={onOpen} color="danger">
				<span className="font-medium">Cancel Order</span>
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
								<p>Are you sure to cancel this order?</p>
							</ModalBody>
							<ModalFooter>
								<Button variant="ghost" onPress={onClose}>
									<p className="font-medium">No</p>
								</Button>
								<Button
									className="bg-red-600"
									onPress={onClose}
									onClick={onCancelOrder}
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

export default AdminCancelOrderModal;
