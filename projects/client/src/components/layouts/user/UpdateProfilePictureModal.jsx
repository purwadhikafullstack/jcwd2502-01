import { Button } from "@nextui-org/react";
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import ProfilePictureFileUpload from "../../uis/FIleUpload/ProfilePictureFileUpload";

const UpdateProfilePictureModal = ({
	open,
	handleOpenUpdateProfilePictureModal,
}) => {
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "scroll";
		}
	}, [open]);

	return (
		<div className={`edit-product z-[9999] ${open ? "block" : "hidden"}`}>
			<div
				className={`z-[999] absolute top-0 right-0 bottom-0 left-0 h-full`}
			>
				<section className="admin-edit-warehouse-product w-auto h-full m-auto flex justify-center items-center">
					<div className="admin-create-product-container w-auto bg-background p-8 rounded-xl">
						<div className="modal-header mb-8 flex justify-center relative w-full">
							<div className="heading-title">
								<h1 className="font-bold text-xl">
									Update profile photo
								</h1>
							</div>
							<div className="close-button absolute top-0 right-0">
								<Button
									onClick={
										handleOpenUpdateProfilePictureModal
									}
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
							<ProfilePictureFileUpload
							// handleProductImage={
							// 	onGettingProductImageFromProps
							// }
							/>
						</div>
						<div className="modal-footer pt-4">
							<Button
								// isLoading={isLoading}
								color="primary"
								className="text-center"
								fullWidth
								type="submit"
								// onClick={() => {
								// 	onSavePicture();
								// }}
							>
								<span className="font-bold text-black">
									Save changes
								</span>
							</Button>
						</div>
					</div>
				</section>
			</div>
			<div
				className={`z-[99] absolute top-0 right-0 left-0 bottom-0 bg-black/40 bg-opacity-70 flex justify-center items-center`}
			></div>
		</div>
	);
};

export default UpdateProfilePictureModal;
