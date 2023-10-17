import React from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from "@nextui-org/react";

const ExploreProductsPage = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<main className="explore-products-page">
				<div className="flex flex-col gap-2">
					<Button onPress={onOpen} className="max-w-fit">
						Open Modal
					</Button>
					<Modal
						isOpen={isOpen}
						placeholder="bottom"
						onOpenChange={onOpenChange}
						size={"5xl"}
						className="rounded-none rounded-t-2xl m-0"
					>
						<ModalContent>
							{(onClose) => (
								<>
									<ModalHeader className="flex flex-col gap-1">
										<span className="font-bold text-title-lg">
											Filter
										</span>
									</ModalHeader>
									<ModalBody></ModalBody>
									<ModalFooter className="w-full flex justify-between">
										<Button
											variant="bordered"
											fullWidth
											onPress={onClose}
										>
											Clear
										</Button>
										<Button
											className="bg-primary-500"
											fullWidth
											onPress={onClose}
										>
											Apply
										</Button>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>
				</div>
			</main>
		</>
	);
};

export default ExploreProductsPage;
