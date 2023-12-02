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

const AdminConfirmOrderModal = ({ orderId }) => {
	const token = localStorage.getItem("accessToken");
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);

	const onConfirmOrder = async () => {
		try {
			setIsLoading(true);
			await axiosInstance(token).post(
				`orders/admin/confirm-order/${orderId}`
			);

			toast.success("Confirm Order Success", {
				style: {
					backgroundColor: "var(--background)",
					color: "var(--text)",
				},
			});

			setTimeout(() => {
				window.location.reload(false);
			}, 1200);
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
									isLoading={isLoading}
									spinner={<MySpinner />}
									className="bg-primary-500"
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
