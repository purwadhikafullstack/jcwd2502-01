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
import { axiosInstance } from "../../../lib/axios";
import toast from "react-hot-toast";
import { MdOutlineLockReset } from "react-icons/md";
import MySpinner from "../../uis/Spinners/Spinner";

const AdminRequestResetPasswordModal = ({ userID }) => {
	const [isLoading, setIsLoading] = useState(false);

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const onRequestResetPassword = async (userId) => {
		try {
			setIsLoading(true);

			const accessToken = localStorage.getItem("accessToken");

			const sendRequest = await axiosInstance(accessToken).get(
				`users/reqChangePassByAdmin/${userId}`
			);

			if (!sendRequest.data.isError)
				toast.success(sendRequest.data.message, {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});

			setIsLoading(false);
			onOpenChange();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Tooltip content="Request reset password">
				<Button isIconOnly variant="flat" onPress={onOpen}>
					<MdOutlineLockReset size={24} />
				</Button>
			</Tooltip>
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
								<p>Are you sure to request reset password?</p>
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
										onRequestResetPassword(userID);
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

export default AdminRequestResetPasswordModal;
