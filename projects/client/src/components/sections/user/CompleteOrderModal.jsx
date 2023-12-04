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

const CompleteOrderModal = ({ orderId }) => {
	const token = localStorage.getItem("accessToken");
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);

	const onCompleteOrder = async () => {
		try {
			setIsLoading(true);

			await axiosInstance(token).patch(`orders/complete/${orderId}`);

			toast.success("Order successfully completed!", {
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
				<span className="font-medium">Confirm Order</span>
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
								<p>Are you sure to confirm this order?</p>
							</ModalBody>
							<ModalFooter>
								<Button variant="ghost" onPress={onClose}>
									<p className="font-medium">No</p>
								</Button>
								<Button
									className="bg-primary-500"
									isLoading={isLoading}
									spinner={<MySpinner />}
									onClick={onCompleteOrder}
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

export default CompleteOrderModal;
