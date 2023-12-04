import React, { useState } from "react";

import { useFormik } from "formik";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Tooltip,
	useDisclosure,
} from "@nextui-org/react";
import { axiosInstance } from "../../../lib/axios";
import toast from "react-hot-toast";
import MySpinner from "../../uis/Spinners/Spinner";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAsync } from "../../../redux/features/products";

const AdminEditCategoryModal = ({ categoryId, categoryType }) => {
	const [isLoading, setIsLoading] = useState(false);

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const { role } = useSelector((state) => state.user);

	const { offset, orderField, orderDirection } = useSelector(
		(state) => state.products
	);

	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			category_type: categoryType,
		},
		onSubmit: async (values) => {
			onSubmitEditCategory(values);
		},
	});

	const onSubmitEditCategory = async (values) => {
		try {
			setIsLoading(true);
			const { category_type } = values;

			if (!category_type) {
				toast.error("Please fill in all form fields", {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
				setIsLoading(false);
				return; // Stop further execution
			}

			const newCategoryData = {
				category_type,
			};

			const accessToken = localStorage.getItem("accessToken");

			const updateCategory = await axiosInstance(accessToken).patch(
				`categories/${categoryId}`,
				newCategoryData
			);

			if (updateCategory.data.isError) {
				toast.error(updateCategory.data.message, {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
				setIsLoading(false);
				return;
			}

			toast.success(updateCategory.data.message, {
				style: {
					backgroundColor: "var(--background)",
					color: "var(--text)",
				},
			});

			dispatch(
				fetchCategoriesAsync(
					`?orderField=${orderField}&orderDirection=${orderDirection}&offset=${offset}`
				)
			);

			setIsLoading(false);
			onOpenChange();

			return;
		} catch (error) {
			toast.error("Network error", {
				style: {
					backgroundColor: "var(--background)",
					color: "var(--text)",
				},
			});
			setIsLoading(false);
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleFormInput = (event) => {
		const { target } = event;
		formik.setFieldValue(target.name, target.value);
	};

	return (
		<>
			<Tooltip content="Edit category">
				<Button
					isIconOnly
					variant="light"
					className="text-lg text-default-400 cursor-pointer active:opacity-50"
					onPress={onOpen}
					isDisabled={role !== "super"}
				>
					<BiEdit size={24} />
				</Button>
			</Tooltip>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Edit category
							</ModalHeader>
							<ModalBody>
								<form
									onSubmit={formik.handleSubmit}
									className="flex flex-col justify-between gap-4 h-full pb-4"
								>
									<div className="form-control">
										<Input
											type="text"
											name="category_type"
											label="Category Name"
											labelPlacement="outside"
											variant="bordered"
											radius="sm"
											size="lg"
											placeholder="Laptop"
											isRequired
											value={formik.values.category_type}
											onChange={handleFormInput}
										/>
									</div>
									<div className="modal-footer pt-4">
										<Button
											isLoading={isLoading}
											spinner={<MySpinner />}
											color="primary"
											className="text-center"
											fullWidth
											type="submit"
										>
											<span className="font-bold text-black">
												Save changes
											</span>
										</Button>
									</div>
								</form>
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default AdminEditCategoryModal;
