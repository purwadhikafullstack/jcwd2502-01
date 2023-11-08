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
import PaymentMethodsRadioGroup from "../../uis/Radios/PaymentMethodsRadioGroup";

const CheckoutPaymentModal = ({
	totalPrice,
	totalQuantity,
	shippingCost,
	shippingCostString,
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
						size={matches.medium ? "lg" : "full"}
						placement={matches.medium ? "center" : "bottom"}
						scrollBehavior="inside"
						closeButton={false}
						className="md:p-4"
					>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex flex-col gap-1 p-4">
										<h2 className="font-bold text-xl">
											Payment
										</h2>
									</ModalHeader>
									<ModalBody className="p-4">
										<section>
											<h3 className="font-medium mb-4">
												Select Payment Method
											</h3>
											<div className="payment-methods max-w-full">
												<PaymentMethodsRadioGroup />
											</div>
										</section>
									</ModalBody>
									<ModalFooter className="p-0 flex w-full justify-center">
										<section className="checkout-summary-order w-full px-4 py-4 md:rounded-xl">
											<h4 className="text-body-lg font-medium mb-2">
												Shopping summary
											</h4>
											<div className="checkout-summary-content mb-12	md:mb-2">
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
														{shippingCostString}
													</span>
												</p>
											</div>
											<div className="checkout-pay flex items-center pb-4 md:pt-2 md:pb-0">
												<p className="flex flex-col text-body-lg md:text-price-md mr-12 md:mr-20 border-neutral-200 dark:border-neutral-800">
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
