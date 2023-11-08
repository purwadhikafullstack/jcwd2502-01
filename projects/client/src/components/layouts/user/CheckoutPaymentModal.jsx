import React, { useEffect } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from "@nextui-org/react";
import Media from "react-media";

const CheckoutPaymentModal = ({
	totalPrice,
	totalQuantity,
	shippingCost,
	totalTransaction,
}) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<Button
				size="lg"
				color="primary"
				fullWidth
				onPress={onOpen}
				isDisabled={!shippingCost}
			>
				<span className="font-bold text-black text-body-lg">Pay</span>
			</Button>
			<Media
				queries={{
					medium: "(min-width: 768px)",
				}}
			>
				{(matches) => (
					<Modal
						isOpen={isOpen}
						onOpenChange={onOpenChange}
						size={matches.media ? "2xl" : "full"}
						closeButton={false}
					>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex flex-col gap-1">
										Payment
									</ModalHeader>
									<ModalBody className="p-0"></ModalBody>
									<ModalFooter className="p-0 flex w-full justify-center">
										<section className="checkout-summary-order w-full px-4 py-4 md:rounded-xl md:border-2 border-primary-100 dark:border-primary-900">
											<h4 className="text-body-lg font-medium mb-2">
												Shopping summary
											</h4>
											<div className="checkout-summary-content mb-12">
												<p className="flex justify-between items-center text-label-lg md:text-body-lg">
													<span>
														Total Price{" "}
														{`(${totalQuantity} items)`}
													</span>
													<span className="font-bold">
														{totalPrice}
													</span>
												</p>
												<p className="flex justify-between items-center text-label-lg md:text-body-lg">
													<span>Shipping cost</span>
													<span className="font-bold">
														{shippingCost}
													</span>
												</p>
											</div>
											<div className="checkout-pay flex items-center pb-4 md:pt-2 md:pb-0">
												<p className="flex flex-col text-body-lg md:text-price-md mr-12 border-neutral-200 dark:border-neutral-800">
													<span className="text-sm">
														Total Bill
													</span>
													<span className="font-bold">
														{totalTransaction}
													</span>
												</p>
												<Button
													size="md"
													color="primary"
													fullWidth
													onPress={onOpen}
													isDisabled={!shippingCost}
												>
													<span className="font-bold text-black text-body-lg">
														Pay
													</span>
												</Button>
											</div>
										</section>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>
				)}
			</Media>
		</>
	);
};

export default CheckoutPaymentModal;
