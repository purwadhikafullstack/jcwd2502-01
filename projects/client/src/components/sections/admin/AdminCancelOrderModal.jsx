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

const AdminCancelOrderModal = ({ orderId }) => {
	const token = localStorage.getItem("accessToken");
	const [isLoading, setIsLoading] = useState(false);

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const onCancelOrder = async () => {
		try {
			setIsLoading(true);
			await axiosInstance(token).patch(
				`orders/admin/cancel-order/${orderId}`
			);

			toast.success("Cancel Order Success", {
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
									isLoading={isLoading}
									spinner={<MySpinner />}
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
