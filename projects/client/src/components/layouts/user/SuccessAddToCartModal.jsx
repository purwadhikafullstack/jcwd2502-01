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

const SuccessAddToCartModal = ({ productDetailData, success }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const navigate = useNavigate();

	useEffect(() => {
		if (success) {
			onOpen();
		}
	}, []);

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			size="xl"
			placement="top"
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Product successfully added in the cart!
						</ModalHeader>
						<ModalBody>
							<div className="flex items-center">
								<div className="product-image w-24 h-24 aspect-square mr-4">
									<Image
										src={`${
											process.env.REACT_APP_IMAGE_API
										}${productDetailData?.product_images[0].image.substring(
											7
										)}`}
										alt="logitech"
										className="w-full h-full aspect-square object-contain bg-white"
									/>
								</div>
								<p className="font-bold line-clamp-1 w-[50%] text-lg">
									{productDetailData?.product_name}
								</p>
								<Button
									className="ml-auto"
									color="primary"
									onClick={() => navigate("/cart")}
								>
									<span className="text-black font-medium">
										See cart
									</span>
								</Button>
							</div>
						</ModalBody>
						<ModalFooter></ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default SuccessAddToCartModal;
