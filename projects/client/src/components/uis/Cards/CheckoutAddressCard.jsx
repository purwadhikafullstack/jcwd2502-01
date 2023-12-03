import React, { useEffect } from "react";

import Media from "react-media";
import { Button } from "@nextui-org/react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
	onSetSelectedUserAddressId,
	onSetUserAddresses,
	setSelectedUserAddressIdMain,
} from "../../../redux/features/users";
import { useLocation } from "react-router-dom";
import EditAddressModal from "../../layouts/user/EditAddressModal";
import { axiosInstance } from "../../../lib/axios";
import DeleteAddressModal from "../../layouts/user/DeleteAddressModal";

const CheckoutAddressCard = ({ userAddressData }) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const accessToken = localStorage.getItem("accessToken");
	const { selectedUserAddressId } = useSelector((state) => state.user);

	const selectedUserAddressIdMain = useSelector(
		(state) => state.user.selectedUserAddressIdMain
	);

	const handleAddressButton = async (addressId) => {
		try {
			if (location.pathname === "/profile/settings") {
				await axiosInstance(accessToken).patch(
					"/user-addresses/mainAddress",
					{ id: userAddressData.id }
				);

				dispatch(onSetUserAddresses(accessToken));
				dispatch(setSelectedUserAddressIdMain(addressId));
			} else {
				dispatch(onSetSelectedUserAddressId(addressId));
			}
		} catch (error) {
			console.log(error);
		}
	};

	const {
		id,
		address,
		address_name,
		recipient_name,
		is_default,
		province,
		city,
	} = userAddressData;

	return (
		<Media
			queries={{
				medium: "(min-width: 768px)",
			}}
		>
			{(matches) => (
				<div
					className={`mb-3 address-card flex justify-between items-center border-2 ${
						selectedUserAddressId === id
							? "border-primary-500"
							: "border-neutral-300 dark:border-neutral-700"
					}  rounded-xl p-4`}
				>
					<section className="address-content pr-6 md:w-[80%]">
						<div className="address-title flex items-center">
							<p className="font-bold text-label-lg md:text-body-lg text-gray-600 dark:text-[#dedede] mr-2">
								{address_name}
							</p>
							{is_default ? (
								<div className="chip-main-address bg-secondary-500 px-1 rounded-[4px]">
									<p className="font-medium text-[11px] md:text-label-lg text-white">
										Main
									</p>
								</div>
							) : null}
						</div>
						<div className="address-recipient-name">
							<p className="font-bold text-body-lg md:text-price-md">
								{recipient_name}
							</p>
						</div>
						<div className="full-address text-label-md md:text-base">
							{address}, {city?.type} {city?.city_name},{" "}
							{province?.province}, {city?.postal_code}
						</div>

						{location.pathname === "/profile/settings" ? (
							<div className="flex gap-4 mt-4">
								<EditAddressModal data={userAddressData} />
								<DeleteAddressModal
									addressID={userAddressData.id}
								/>
							</div>
						) : null}
					</section>
					<section className="actions">
						{selectedUserAddressId === id ? (
							<IoCheckmarkCircleOutline
								size={28}
								className="text-primary-500"
							/>
						) : (
							<Media
								queries={{
									medium: "(min-width: 768px)",
								}}
							>
								{(matches) => (
									<Button
										color="primary"
										size={matches.medium ? "md" : "sm"}
										onPress={() => handleAddressButton(id)}
										className={`${
											id === selectedUserAddressIdMain &&
											location.pathname ===
												"/profile/settings" &&
											"hidden"
										}`}
									>
										<span
											className={`font-bold text-label-md md:text-label-lg text-black`}
										>
											{location.pathname ===
											"/profile/settings"
												? "Set as main"
												: "Select"}
										</span>
									</Button>
								)}
							</Media>
						)}
					</section>
				</div>
			)}
		</Media>
	);
};

export default CheckoutAddressCard;
