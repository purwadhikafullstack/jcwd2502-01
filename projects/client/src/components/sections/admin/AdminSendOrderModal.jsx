import React, { useState } from "react";
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
import MySpinner from "../../uis/Spinners/Spinner";

const AdminSendOrderModal = ({ orderId }) => {
	const token = localStorage.getItem("accessToken");
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);

	const onSendOrder = async () => {
		try {
			setIsLoading(true);
			await axiosInstance(token).patch(
				`orders/admin/send-order/${orderId}`
			);

			toast.success("Send Order Success", {
				style: {
					backgroundColor: "var(--background)",
					color: "var(--text)",
				},
			});

			setTimeout(() => {
				window.location.reload(false);
			}, 1200);
		} catch (error) {
			toast.error("Network error", {
				style: {
					backgroundColor: "var(--background)",
					color: "var(--text)",
				},
			});
			setTimeout(() => {
				window.location.reload(false);
			}, 1200);
			console.log(error);
		}
	};

	return (
		<>
			<Button
				fullWidth
				variant="faded"
				onPress={onOpen}
				color="primary"
				// className="bg-primary-500"
			>
				<span className="font-medium">Send Order</span>
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
								<p>Are you sure to send this order?</p>
							</ModalBody>
							<ModalFooter>
								<Button variant="ghost" onPress={onClose}>
									<p className="font-medium">No</p>
								</Button>
								<Button
									className="bg-primary-500"
									isLoading={isLoading}
									spinner={<MySpinner />}
									onClick={onSendOrder}
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

export default AdminSendOrderModal;
