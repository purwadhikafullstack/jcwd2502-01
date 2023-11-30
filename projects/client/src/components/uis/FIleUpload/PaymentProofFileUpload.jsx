import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Media from "react-media";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from "@nextui-org/react";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { axiosInstance } from "../../../lib/axios";
import MySpinner from "../Spinners/Spinner";

const PaymentProofFileUpload = ({ orderId }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [selectedImage, setSelectedImage] = useState(null);
	const [previewImage, setPreviewImage] = useState(null);

	const getFileImage = (event) => {
		const fileImage = event.target.files[0];

		if (event.target.files && event.target.files.length > 0) {
			const fileSizeInMB = fileImage.size / (1024 * 1024); // Convert size to MB

			if (fileSizeInMB > 3) {
				toast.error("File size should not exceed 3 MB", {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
				return;
			}

			setSelectedImage(fileImage);
			setPreviewImage(URL.createObjectURL(fileImage));
		}
	};

	const onUploadPaymentProof = async () => {
		try {
			setIsLoading(true);

			const fd = new FormData();

			if (!selectedImage) {
				fd.append("image", null);
			} else {
				fd.append("image", selectedImage);
			}

			const token = localStorage.getItem("accessToken");

			const uploadPaymentProof = await axiosInstance(token).post(
				`checkouts/upload-payment/${orderId}`,
				fd
			);

			if (uploadPaymentProof.status === 201) {
				toast.success("Image uploaded successfully", {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});

				setTimeout(() => {
					window.location.reload(false);
				}, 1500);
			}

			return true;
		} catch (error) {
			setTimeout(() => {
				setIsLoading(false);
				toast.error(error.response.data.message, {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
			}, 1500);
			console.log(error);
		}
	};

	return (
		<>
			<Toaster />
			<Media
				queries={{
					medium: "(min-width: 768px)",
				}}
			>
				{(matches) => (
					<>
						<Button
							color="primary"
							size={matches.medium ? "md" : "sm"}
							onPress={onOpen}
						>
							<span className="font-medium text-black">
								Upload payment proof
							</span>
						</Button>
						<Modal
							isOpen={isOpen}
							onClose={() => {
								setPreviewImage(null);
								setSelectedImage(null);
							}}
							onOpenChange={onOpenChange}
							className="w-auto"
							placement="center"
						>
							<ModalContent>
								{(onClose) => (
									<>
										<ModalHeader className="flex flex-col gap-1">
											Upload Payment Proof
										</ModalHeader>
										<ModalBody className="flex justify-center items-center">
											<div
												className={`form-input-wrapper relative flex justify-center items-center w-[320px] h-[284px] bg-background border-2 border-white border-opacity-50 ${
													!previewImage &&
													"border-dashed"
												} rounded-xl cursor-pointer`}
												onClick={() =>
													document
														.querySelector(
															"#payment_proof"
														)
														.click()
												}
											>
												{previewImage ? (
													<img
														src={previewImage}
														alt=""
														className="w-full h-full object-cover rounded-xl"
													/>
												) : (
													<div className="flex flex-col items-center justify-center h-full pb-4">
														<BsFillCloudArrowUpFill
															size={70}
															className="text-neutral-300"
														/>
														<div className="file-input-instruction font-medium text-center">
															<p>
																Browse to choose
																a file
															</p>
															<p className="text-label-lg opacity-50">
																(Max size: 3 mb)
															</p>
														</div>
													</div>
												)}
												<form encType="multipart/form-data">
													<input
														type="file"
														name="payment_proof"
														accept="image/jpeg, image/png"
														id="payment_proof"
														hidden
														className="absolute"
														onChange={getFileImage}
													/>
												</form>
											</div>
										</ModalBody>
										<ModalFooter>
											<Button
												variant="ghost"
												onPress={() => {
													onClose();
													setPreviewImage(null);
													setSelectedImage(null);
												}}
											>
												<p className="font-medium">
													Cancel
												</p>
											</Button>
											<Button
												color="primary"
												isDisabled={!previewImage}
												isLoading={isLoading}
												spinner={<MySpinner />}
												onPress={() =>
													onUploadPaymentProof()
												}
											>
												<p className="font-medium text-black">
													Upload
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
		</>
	);
};

export default PaymentProofFileUpload;
