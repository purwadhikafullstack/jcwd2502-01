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
import { IoTrashOutline } from "react-icons/io5";

const AdminDeleteCategoryModal = ({ categoryID }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const onDelete = async (categoryId) => {
		try {
			setIsLoading(true);

			const accessToken = localStorage.getItem("accessToken");
			await axiosInstance(accessToken).delete(`categories/${categoryId}`);

			toast.success("Category successfully deleted", {
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
			<Tooltip color="danger" content="Remove Category">
				<Button
					isIconOnly
					variant="light"
					className="text-lg text-danger cursor-pointer active:opacity-50"
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
								<p>Are you sure to delete this category?</p>
							</ModalBody>
							<ModalFooter>
								<Button variant="ghost" onPress={onClose}>
									<p className="font-medium">No</p>
								</Button>
								<Button
									isLoading={isLoading}
									className="bg-red-600"
									onClick={() => {
										onDelete(categoryID);
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

export default AdminDeleteCategoryModal;
