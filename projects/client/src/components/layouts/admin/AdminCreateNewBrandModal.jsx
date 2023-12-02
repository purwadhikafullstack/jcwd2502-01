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
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import MySpinner from "../../uis/Spinners/Spinner";

const AdminCreateNewBrandModal = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [brandName, setBrandName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const role = useSelector((state) => state.user.role);

	const onSubmit = async (brandName) => {
		try {
			setIsLoading(true);

			if (!brandName) {
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

			const addBrand = await axiosInstance(accessToken).post(`brands`, {
				brand_name: brandName,
			});

			if (addBrand.data.isError) {
				toast.error(addBrand.data.message, {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
				setIsLoading(false);
				return;
			}
			toast.success(addBrand.data.message, {
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
							<span>Add New Brand</span>
						</p>
					</Button>
					<Modal
						isOpen={isOpen}
						onOpenChange={onOpenChange}
						placement={matches.medium ? "center" : "bottom"}
						scrollBehavior="inside"
						size={matches.medium ? "2xl" : "full"}
					>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex justify-center">
										<h2 className="text-xl font-bold mb-2">
											Add New Brand
										</h2>
									</ModalHeader>
									<ModalBody>
										<form className="flex flex-col gap-4 h-full">
											<div className="form-control">
												<Input
													type="text"
													name="brand_name"
													label="Brand's Name"
													labelPlacement="outside"
													variant="bordered"
													radius="sm"
													size="lg"
													placeholder="Razer"
													isRequired
													onChange={(e) =>
														setBrandName(
															e.target.value
														)
													}
												/>
											</div>
										</form>
									</ModalBody>
									<ModalFooter className="justify-center">
										<Button
											color="primary"
											className="text-center mb-4"
											isLoading={isLoading}
											spinner={<MySpinner />}
											fullWidth
											onPress={() => onSubmit(brandName)}
										>
											<span className="font-bold text-black">
												Add new brand
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

export default AdminCreateNewBrandModal;
