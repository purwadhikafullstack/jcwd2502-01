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

const AdminRejectOrderModal = ({ orderId }) => {
	const token = localStorage.getItem("accessToken");
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const onRejectOrder = async () => {
		try {
			await axiosInstance(token).patch(
				`orders/admin/reject-order/${orderId}`
			);

			toast.success("Reject Order Success");

			window.location.reload(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Button fullWidth onPress={onOpen} className="bg-red-600">
				<span className="font-medium text-white">Reject Order</span>
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
								<p>Are you sure to reject this order?</p>
							</ModalBody>
							<ModalFooter>
								<Button variant="ghost" onPress={onClose}>
									<p className="font-medium">Cancel</p>
								</Button>
								<Button
									className="bg-red-600"
									onPress={onClose}
									onClick={onRejectOrder}
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

export default AdminRejectOrderModal;
