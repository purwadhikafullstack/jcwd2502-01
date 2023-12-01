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
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmin } from "../../../redux/features/manageUser";

const AdminDeleteUserAdminModal = ({ userID }) => {
	const [isLoading, setIsLoading] = useState(false);

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const { offsetAdmin, searchAdmin, orderDirectionAdmin, orderFieldAdmin } =
		useSelector((state) => state.manageUsers);

	const dispatch = useDispatch();

	const onDeleteUserAdmin = async (userId) => {
		try {
			setIsLoading(true);

			const accessToken = localStorage.getItem("accessToken");

			const deleteAdmin = await axiosInstance(accessToken).delete(
				`/users/deleteAdminData/${userId}`
			);

			if (!deleteAdmin.data.isError)
				toast.success(deleteAdmin.data.message, {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});

			setIsLoading(false);
			onOpenChange();

			dispatch(
				fetchAdmin(
					`?${
						searchAdmin && `&search=${searchAdmin}`
					}&orderField=${orderFieldAdmin}&orderDirection=${orderDirectionAdmin}&offset=${offsetAdmin}`
				)
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Tooltip content="Request reset password">
				<Button
					isIconOnly
					variant="flat"
					className="text-danger"
					onPress={onOpen}
				>
					<IoTrashOutline size={24} />
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
								<p>Are you sure to delete this admin?</p>
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
										onDeleteUserAdmin(userID);
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

export default AdminDeleteUserAdminModal;
