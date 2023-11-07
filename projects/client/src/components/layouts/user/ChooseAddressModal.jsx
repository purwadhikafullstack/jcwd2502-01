import React, { useEffect, useState } from "react";

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	useDisclosure,
} from "@nextui-org/react";

import { IoChevronForward, IoSearch } from "react-icons/io5";

import Media from "react-media";
import CreateNewAddressModal from "./CreateNewAddressModal";
import CheckoutAddressCard from "../../uis/Cards/CheckoutAddressCard";
import { axiosInstance } from "../../../lib/axios";
import { useDispatch } from "react-redux";
import { onUserAddress } from "../../../redux/features/users";

const ChooseAddressModal = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const dispatch = useDispatch();

	const [userAddresses, setUserAddresses] = useState([]);
	const [oneTime, setOneTime] = useState(0);

	const renderUserAddresses = () => {
		return userAddresses?.map((user_address) => {
			return <CheckoutAddressCard userAddressData={user_address} />;
		});
	};

	const fetchUserAddresses = async () => {
		try {
			const { data } = await axiosInstance().get(`user-addresses/${1}`);

			setUserAddresses(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchUserAddresses();
	}, []);

	useEffect(() => {
		if (oneTime === 0) {
			userAddresses?.map((address) => {
				if (address.is_default === true) {
					dispatch(onUserAddress(address.id));
					setOneTime(1);
					return;
				}
			});
		}
	}, [userAddresses]);

	return (
		<div className="choose-address-modal">
			<div className="mobile-address-modal-button md:hidden">
				<Button isIconOnly color="secondary" onPress={onOpen}>
					<IoChevronForward />
				</Button>
			</div>
			<div className="desktop-address-modal-button hidden md:block md:mt-4">
				<Button color="secondary" size="md" onPress={onOpen}>
					<span className="font-medium">Select other address</span>
				</Button>
			</div>
			<Media
				queries={{
					medium: "(min-width: 768px)",
				}}
			>
				{(matches) => (
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
									<ModalHeader className="flex flex-col gap-2 p-4">
										<h2 className="text-center mb-2">
											Address List
										</h2>
										<Input
											type="text"
											startContent={
												<IoSearch opacity={".5"} />
											}
											size={matches.medium ? "lg" : "md"}
											className="mb-2"
											placeholder="Search for label address or recipient's name"
										/>
										<CreateNewAddressModal />
									</ModalHeader>
									<ModalBody className="p-4">
										{renderUserAddresses()}
									</ModalBody>
									<ModalFooter>
										<Button
											color="primary"
											onPress={onClose}
											className="mb-4"
											fullWidth
										>
											<span className="font-medium text-black">
												Save changes
											</span>
										</Button>
									</ModalFooter>
								</>
							)}
						</ModalContent>
					</Modal>
				)}
			</Media>
		</div>
	);
};

export default ChooseAddressModal;
