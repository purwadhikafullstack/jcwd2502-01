import React, { useState } from "react";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	Textarea,
	useDisclosure,
} from "@nextui-org/react";
import Media from "react-media";
import { axiosInstance } from "../../../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import MySpinner from "../../uis/Spinners/Spinner";
import { fetchCategoriesAsync } from "../../../redux/features/products";

const AdminCreateNewCategoryModal = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [categoryType, setCategoryType] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const role = useSelector((state) => state.user.role);
	const { orderField, orderDirection, offset } = useSelector(
		(state) => state.products
	);
	const dispatch = useDispatch();
	const onSubmit = async (categoryType) => {
		try {
			setIsLoading(true);

			if (!categoryType) {
				toast.error("Please fill in all form fields", {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
				setIsLoading(false);
				return; // Stop further execution
			}

			const accessToken = localStorage.getItem("accessToken");

			const addCategory = await axiosInstance(accessToken).post(
				`categories`,
				{
					category_type: categoryType,
				}
			);

			if (addCategory.data.isError) {
				toast.error(addCategory.data.message, {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
				setIsLoading(false);
				return;
			}

			toast.success(addCategory.data.message, {
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
			onOpenChange();
			setIsLoading(false);
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
					<Button
						color="primary"
						size="md"
						onPress={onOpen}
						isDisabled={role !== "super"}
					>
						<p className="font-medium text-black flex items-center gap-1">
							<span className="text-[20px]">+</span>
							<span>Add New Category</span>
						</p>
					</Button>
					<Modal
						isOpen={isOpen}
						onOpenChange={onOpenChange}
						scrollBehavior="inside"
					>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex justify-center">
										<h2 className="text-xl font-bold mb-2">
											Add New Category
										</h2>
									</ModalHeader>
									<ModalBody>
										{/* <form className="flex flex-col gap-4 h-full"> */}
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
												onChange={(e) =>
													setCategoryType(
														e.target.value
													)
												}
											/>
										</div>
										{/* </form> */}
									</ModalBody>
									<ModalFooter className="justify-center">
										<Button
											color="primary"
											className="text-center mb-4"
											isLoading={isLoading}
											spinner={<MySpinner />}
											fullWidth
											onPress={() =>
												onSubmit(categoryType)
											}
										>
											<span className="font-bold text-black">
												Add new category
											</span>
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

export default AdminCreateNewCategoryModal;
