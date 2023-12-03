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
import toast from "react-hot-toast";
import Media from "react-media";
import MySpinner from "../../uis/Spinners/Spinner";
import { axiosInstance } from "../../../lib/axios";
import { useDispatch } from "react-redux";
import { onSetUserAddresses } from "../../../redux/features/users";

const DeleteAddressModal = ({ addressID }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const accessToken = localStorage.getItem("accessToken");

	const dispatch = useDispatch();

	const onDelete = async (addressId) => {
		try {
			setIsLoading(true);

			await axiosInstance(accessToken).delete(
				"/user-addresses/deleteAddress",
				{ data: { id: addressId } }
			);

			setIsLoading(false);

			toast.success("Address deleted successfully", {
				style: {
					backgroundColor: "var(--background)",
					color: "var(--text)",
				},
			});

			onOpenChange();

			dispatch(onSetUserAddresses(accessToken));
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Media
			queries={{
				medium: "(min-width: 768px)",
			}}
		>
			{(matches) => (
				<>
					<div onClick={onOpen}>
						<span className="font-medium text-label-lg text-red-600 hover:cursor-pointer hover:underline">
							Delete
						</span>
					</div>
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
										<p>
											Are you sure to delete this address?
										</p>
									</ModalBody>
									<ModalFooter>
										<Button
											variant="ghost"
											onPress={onClose}
										>
											<p className="font-medium">No</p>
										</Button>
										<Button
											isLoading={isLoading}
											spinner={<MySpinner />}
											className="bg-red-600"
											onClick={() => {
												onDelete(addressID);
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
			)}
		</Media>
	);
};

export default DeleteAddressModal;
