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
import { useDispatch, useSelector } from "react-redux";
import { fetchStockMutationsAsync } from "../../../redux/features/products";

const AdminCancelStockRequestModal = ({ requestID }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const dispatch = useDispatch();

	const { warehouse, offset, status } = useSelector(
		(state) => state.products
	);

	const onCancelStockRequest = async (mutationId) => {
		try {
			setIsLoading(true);

			const accessToken = localStorage.getItem("accessToken");
			const cancelMutation = await axiosInstance(accessToken).patch(
				`stocks/mutation/${mutationId}`,
				{
					status: "canceled",
				}
			);

			if (cancelMutation.data.isError) {
				toast.error(cancelMutation.data.message, {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
				setIsLoading(false);
				return;
			}
			toast.success(cancelMutation.data.message, {
				style: {
					backgroundColor: "var(--background)",
					color: "var(--text)",
				},
			});

			dispatch(
				fetchStockMutationsAsync(
					"out",
					`?warehouse=${warehouse}&status=${status}&offset=${offset}`
				)
			);

			setIsLoading(false);

			onOpenChange();
		} catch (error) {
			toast.error("Network error", {
				style: {
					backgroundColor: "var(--background)",
					color: "var(--text)",
				},
			});
			setIsLoading(false);
			console.log(error);
		}
	};

	return (
		<>
			<Button onPress={onOpen} variant="faded" color="danger">
				<span className="font-medium">Cancel</span>
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
								<p>Are you sure to cancel this request?</p>
							</ModalBody>
							<ModalFooter>
								<Button variant="ghost" onPress={onClose}>
									<p className="font-medium">No</p>
								</Button>
								<Button
									isLoading={isLoading}
									spinner={<MySpinner />}
									className="bg-red-600"
									onClick={() => {
										onCancelStockRequest(requestID);
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

export default AdminCancelStockRequestModal;
