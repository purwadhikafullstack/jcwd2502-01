import React, { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import Media from "react-media";

const SuccessAddToCartModal = ({
	productDetailData,
	open,
	handleSuccessState,
}) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const navigate = useNavigate();

	useEffect(() => {
		if (open) {
			onOpen();
		}
	}, []);

	return (
		<Media
			queries={{
				medium: "(min-width: 768px)",
			}}
		>
			{(matches) => (
				<Modal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					onClose={handleSuccessState}
					size={matches.medium ? "xl" : "lg"}
					placement={matches.medium ? "top" : "center"}
				>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader className="flex flex-col gap-1">
									<p className="text-base md:text-lg">
										Product successfully added in the cart!
									</p>
								</ModalHeader>
								<ModalBody className="pb-4">
									<div className="flex items-center">
										<div className="product-image w-[60px] h-[60px] md:w-24 md:h-24 aspect-square mr-4">
											<Image
												src={`${
													process.env
														.REACT_APP_IMAGE_API
												}${productDetailData?.product_images[0].image.substring(
													7
												)}`}
												alt="logitech"
												className="w-full h-full aspect-square object-contain bg-white"
											/>
										</div>
										<p className="font-bold line-clamp-1 w-[50%] text-base md:text-lg">
											{productDetailData?.product_name}
										</p>
										<Button
											className="ml-auto"
											color="primary"
											size={matches.medium ? "md" : "sm"}
											onClick={() => navigate("/cart")}
										>
											<span className="text-black font-medium">
												See cart
											</span>
										</Button>
									</div>
								</ModalBody>
							</>
						)}
					</ModalContent>
				</Modal>
			)}
		</Media>
	);
};

export default SuccessAddToCartModal;
