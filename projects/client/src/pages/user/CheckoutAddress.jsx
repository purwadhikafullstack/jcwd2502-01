import React, { useCallback, useEffect, useState } from "react";

import { IoLocationSharp } from "react-icons/io5";
import ChooseAddressModal from "../../components/layouts/user/ChooseAddressModal";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../lib/axios";

const CheckoutAddress = () => {
	const [selectedUserAddress, setSelectedUserAddress] = useState();

	const { user_address } = useSelector((state) => state.user);

	const fetchSelectedUserAddress = useCallback(async () => {
		try {
			const { data } = await axiosInstance().get(
				`user-addresses/${1}?address_id=${user_address}`
			);

			setSelectedUserAddress(data.data);
		} catch (error) {
			console.log(error);
		}
	}, [user_address]);

	useEffect(() => {
		if (user_address) {
			fetchSelectedUserAddress();
		}
	}, [user_address]);

	return (
		<>
			<section className="checkout-address p-4 mb-4 md:p-6 bg-neutral-100 dark:bg-neutral-900 md:rounded-xl">
				<p className="text-body-lg font-medium mb-2">
					Your shipping address
				</p>
				<div className="wrapper flex items-center justify-between md:block">
					<div className="selected-address w-[84%] md:w-full">
						<p className="flex items-center text-body-lg md:text-title-lg font-bold">
							<IoLocationSharp className="fill-primary-600 md:mr-2" />
							{selectedUserAddress?.address_name} •{" "}
							{selectedUserAddress?.recipient_name}
						</p>
						<p className="text-label-lg md:text-body-lg line-clamp-1 md:line-clamp-none">
							{selectedUserAddress?.address},{" "}
							{selectedUserAddress?.city?.type}{" "}
							{selectedUserAddress?.city?.city_name},{" "}
							{selectedUserAddress?.province?.province},{" "}
							{selectedUserAddress?.city?.postal_code}{" "}
						</p>
					</div>
					<ChooseAddressModal />
				</div>
			</section>
		</>
	);
};

export default CheckoutAddress;
