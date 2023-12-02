import React from "react";

import { IoLocationSharp } from "react-icons/io5";
import ChooseAddressModal from "../../layouts/user/ChooseAddressModal";
import { Card, CardBody } from "@nextui-org/react";
import CreateNewAddressModal from "../../layouts/user/CreateNewAddressModal";

const CheckoutAddress = ({ selectedUserAddressData, resetShippingCost }) => {
	console.log(
		"🚀 ~ file: CheckoutAddress.jsx:7 ~ CheckoutAddress ~ selectedUserAddressData:",
		selectedUserAddressData
	);

	const renderSelectedAddress = () => {
		if (selectedUserAddressData) {
			return (
				<div className="selected-address w-[84%] md:w-full">
					<p className="flex items-center text-body-lg md:text-title-lg font-bold">
						<IoLocationSharp className="fill-primary-600 md:mr-2" />
						{selectedUserAddressData?.address_name} •{" "}
						{selectedUserAddressData?.recipient_name}
					</p>
					<p className="text-label-lg md:text-body-lg line-clamp-1 md:line-clamp-none">
						{selectedUserAddressData?.address},{" "}
						{selectedUserAddressData?.city?.type}{" "}
						{selectedUserAddressData?.city?.city_name},{" "}
						{selectedUserAddressData?.province?.province},{" "}
						{selectedUserAddressData?.city?.postal_code}{" "}
					</p>
				</div>
			);
		}
		return (
			<Card>
				<CardBody className="p-8">
					<h4 className="font-bold text-base text-center">
						<span className="text-[18px]">
							Where should we send the goodies?
						</span>
						<br /> Drop your address here. <br /> We promise not to
						send a herd of elephants with your package!
					</h4>
				</CardBody>
			</Card>
		);
	};

	return (
		<section className="checkout-address p-4 mb-4 md:p-6 bg-neutral-100 dark:bg-neutral-900 md:rounded-xl">
			<p className="text-body-lg font-medium mb-2">
				Your shipping address
			</p>
			<div className="wrapper flex items-center justify-between md:block">
				{/* <div className="selected-address w-[84%] md:w-full">
					<p className="flex items-center text-body-lg md:text-title-lg font-bold">
						<IoLocationSharp className="fill-primary-600 md:mr-2" />
						{selectedUserAddressData?.address_name} •{" "}
						{selectedUserAddressData?.recipient_name}
					</p>
					<p className="text-label-lg md:text-body-lg line-clamp-1 md:line-clamp-none">
						{selectedUserAddressData?.address},{" "}
						{selectedUserAddressData?.city?.type}{" "}
						{selectedUserAddressData?.city?.city_name},{" "}
						{selectedUserAddressData?.province?.province},{" "}
						{selectedUserAddressData?.city?.postal_code}{" "}
					</p>
				</div> */}
				{renderSelectedAddress()}
				{selectedUserAddressData ? (
					<ChooseAddressModal resetShippingCost={resetShippingCost} />
				) : (
					<CreateNewAddressModal
						userAddressesData={[selectedUserAddressData]}
					/>
				)}
			</div>
		</section>
	);
};

export default CheckoutAddress;
