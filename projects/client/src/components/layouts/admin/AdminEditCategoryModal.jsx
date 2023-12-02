import React, { useCallback, useEffect, useState } from "react";

import { useFormik } from "formik";

import { IoClose } from "react-icons/io5";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { axiosInstance } from "../../../lib/axios";
import toast from "react-hot-toast";
import MySpinner from "../../uis/Spinners/Spinner";

const AdminEditCategoryModal = ({
	handleOpenEditCategoryModal,
	categoryId,
	categoryType,
}) => {
	const [isLoading, setIsLoading] = useState(false);
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

			setTimeout(() => {
				window.location.reload(false);
			}, 1200);

			setIsLoading(false);
			return;
		} catch (error) {
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
		<div className={`edit-product z-[999999] block`}>
			<div
				className={`z-[99999] absolute top-0 right-0 bottom-0 left-0 h-full`}
			>
				<section className="admin-edit-warehouse-product w-[820px] h-full m-auto flex justify-center items-center">
					<div className="admin-create-product-container w-full bg-background p-8 rounded-xl">
						<div className="modal-header mb-8 flex justify-center relative w-full">
							<div className="heading-title">
								<h1 className="font-bold text-xl">
									Update Category
								</h1>
							</div>
							<div className="close-button absolute top-0 right-0">
								<Button
									onClick={() => {
										handleOpenEditCategoryModal();
									}}
									isIconOnly
									variant="light"
									radius="full"
									size="sm"
								>
									<IoClose
										size={20}
										className="fill-neutral-500"
									/>
								</Button>
							</div>
						</div>
						<div className="modal-body">
							<form
								onSubmit={formik.handleSubmit}
								className="flex flex-col justify-between gap-4 h-full"
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
						</div>
					</div>
				</section>
			</div>
			<div
				className={`z-[9999] absolute top-0 right-0 left-0 bottom-0 bg-black/50 flex justify-center items-center`}
			></div>
		</div>
	);
};

export default AdminEditCategoryModal;
