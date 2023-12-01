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
	Image,
} from "@nextui-org/react";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { axiosInstance } from "../../../lib/axios";
import MySpinner from "../../uis/Spinners/Spinner";
import DefaultAvatar from "../../../assets/avatars/default_avatar.png";
import { useSelector } from "react-redux";

const ChangeProfilePictureModal = ({ orderId }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const { profileUser } = useSelector((state) => state.user);

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

	const onSaveChangeProfilePicture = async () => {
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
				`users/upload-pfp`,
				fd
			);

			if (uploadPaymentProof.status === 201) {
				toast.success("Image uploaded successfully", {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
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
		} finally {
			window.location.reload(false);
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
					{matches.medium ? (
						<Button fullWidth variant="bordered" onPress={onOpen}>
							<p className="font-medium">
								Change profile picture
							</p>
						</Button>
					) : (
						<div
							className="profile-picture w-[112px]"
							onClick={onOpen}
						>
							<Image
								src={
									profileUser
										? `${
												process.env.REACT_APP_IMAGE_API
										  }${profileUser.substring(7)}`
										: DefaultAvatar
								}
								alt=""
								className="w-full h-full rounded-full aspect-square object-cover"
							/>
						</div>
					)}
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
										Change Profile Picture
									</ModalHeader>
									<ModalBody className="flex justify-center items-center">
										<div
											className={`form-input-wrapper relative flex justify-center items-center w-[320px] h-[284px] bg-background border-2 border-white border-opacity-50 ${
												!previewImage && "border-dashed"
											} rounded-xl cursor-pointer`}
											onClick={() =>
												document
													.querySelector(
														"#change_pfp"
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
															Browse to choose a
															file
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
													name="change_pfp"
													accept="image/jpeg, image/png"
													id="change_pfp"
													hidden
													className="absolute"
													onChange={getFileImage}
												/>
											</form>
										</div>
									</ModalBody>
									<ModalFooter>
										<Button
											color="primary"
											fullWidth
											isDisabled={!previewImage}
											isLoading={isLoading}
											spinner={<MySpinner />}
											onPress={() =>
												onSaveChangeProfilePicture()
											}
										>
											<p className="font-medium text-black">
												Save changes
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
	);
};

export default ChangeProfilePictureModal;
