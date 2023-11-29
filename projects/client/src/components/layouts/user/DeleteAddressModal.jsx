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
import Media from "react-media";

const DeleteAddressModal = ({ addressID, handleOnDelete }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const onDelete = async (addressId) => {
		setIsLoading(true);
		toast.success("Address deleted");
		handleOnDelete(addressId);
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
											className="bg-red-600"
											onClick={() => {
												onDelete(addressID);
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
			)}
		</Media>
	);
};

export default DeleteAddressModal;
