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
import { IoTrashOutline } from "react-icons/io5";
import MySpinner from "../../uis/Spinners/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductAsync } from "../../../redux/features/products";

const AdminDeleteProductModal = ({ productID, handleOnDelete }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const orderField = useSelector((state) => state.products.orderField);
	const orderDirection = useSelector(
		(state) => state.products.orderDirection
	);
	const { role } = useSelector((state) => state.user);
	const search = useSelector((state) => state.products.search);
	const offset = useSelector((state) => state.products.offset);
	const category = useSelector((state) => state.products.category);
	const brand = useSelector((state) => state.products.brand);

	const dispatch = useDispatch();

	const onDelete = async (productId) => {
		setIsLoading(true);
		handleOnDelete(productId);
		dispatch(
			fetchProductAsync(
				`?&search=${search}&brand=${brand.join(
					","
				)}&category=${category.join(
					","
				)}&orderField=${orderField}&orderDirection=${orderDirection}&offset=${offset}`
			)
		);
		setIsLoading(false);
	};

	return (
		<>
			<Tooltip color="danger" content="Remove product">
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
								<p>Are you sure to delete this product?</p>
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
										onDelete(productID);
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
	);
};

export default AdminDeleteProductModal;
