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
import MySpinner from "../../uis/Spinners/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrandsAsync } from "../../../redux/features/products";

const AdminDeleteBrandModal = ({ brandID }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const { offset, orderField, orderDirection } = useSelector(
		(state) => state.products
	);
	const { role } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	const onDelete = async (brandId) => {
		try {
			setIsLoading(true);

			const accessToken = localStorage.getItem("accessToken");
			const deleteBrand = await axiosInstance(accessToken).delete(
				`brands/${brandId}`
			);

			if (deleteBrand.data.isError) {
				toast.error(deleteBrand.data.message, {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
				setIsLoading(false);
				return;
			}

			toast.success(deleteBrand.data.message, {
				style: {
					backgroundColor: "var(--background)",
					color: "var(--text)",
				},
			});

			dispatch(
				fetchBrandsAsync(
					`?orderField=${orderField}&orderDirection=${orderDirection}&offset=${offset}`
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
			<Tooltip color="danger" content="Remove Brand">
				<Button
					isIconOnly
					variant="light"
					className="text-lg text-danger cursor-pointer active:opacity-50"
					onPress={onOpen}
					isDisabled={role !== "super"}
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
								<p>Are you sure to delete this brand?</p>
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
										onDelete(brandID);
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

export default AdminDeleteBrandModal;
