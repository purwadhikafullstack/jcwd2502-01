import React from "react";
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

const PaymentProofModal = ({ imageSource }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<Button onPress={onOpen} fullWidth>
				View Payment Proof
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				className="max-w-[1200px]"
				scrollBehavior="inside"
			>
				<ModalContent>
					{(onClose) => (
						<ModalBody className="p-0 w-full">
							<Image
								className="w-[1200px]"
								src={`${
									process.env.REACT_APP_IMAGE_API
								}${imageSource.substring(7)}`}
							/>
						</ModalBody>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default PaymentProofModal;
