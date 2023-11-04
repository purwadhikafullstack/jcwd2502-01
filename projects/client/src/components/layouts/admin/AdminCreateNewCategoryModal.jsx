import React from "react";
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

const AdminCreateNewCategoryModal = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<Media
			queries={{
				medium: "(min-width: 768px)",
			}}
		>
			{(matches) => (
				<>
					<Button color="secondary" size="md" onPress={onOpen}>
						<p className="font-medium text-white flex items-center gap-1 px-4">
							<span className="text-[20px]">+</span>
							<span>Add New Category</span>
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
											Add New Category
										</h2>
									</ModalHeader>
									<ModalBody>
										<form className="flex flex-col gap-4 h-full">
											<div className="form-control">
												<Input
													type="text"
													name="category_type"
													label="Category Name"
													labelPlacement="outside"
													variant="bordered"
													radius="sm"
													size="lg"
													placeholder="Laptop"
													isRequired
													// onChange={(e) =>
													// 	setName(e.target.value)
													// }
												/>
											</div>
										</form>
									</ModalBody>
									<ModalFooter className="justify-center">
										<Button
											color="primary"
											className="text-center mb-4"
											// isLoading={isLoading}
											fullWidth
											// onPress={() => onCreate(data)}
										>
											<span className="font-bold text-black">
												Save new warehouse
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

export default AdminCreateNewCategoryModal;
