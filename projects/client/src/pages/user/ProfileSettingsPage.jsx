import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultAvatar from "../../assets/avatars/default_avatar.png";
import { Input, Image, Chip, Button, Card, CardBody } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import CheckoutAddressCard from "../../components/uis/Cards/CheckoutAddressCard";
import CreateNewAddressModal from "../../components/layouts/user/CreateNewAddressModal";
import { onSetUserAddresses } from "../../redux/features/users";
import EditPersonalInformationModal from "../../components/layouts/user/EditPersonalInformationModal";

import EditPersonalContactModal from "../../components/layouts/user/EditPersonalContactModal";
import Media from "react-media";
import ChangeProfilePictureModal from "../../components/layouts/user/ChangeProfilePictureModal";
import { axiosInstance } from "../../lib/axios";
import toast, { Toaster } from "react-hot-toast";
import MySpinner from "../../components/uis/Spinners/Spinner";

const ProfileSettingsPage = () => {
	const dispatch = useDispatch();
	const token = localStorage.getItem("accessToken");

	const [isLoading, setIsLoading] = useState(false);

	const {
		username,
		email,
		userAddresses,
		status,
		profileUser,
		phone,
		gender,
		birth_date,
	} = useSelector((state) => state.user);

	const profilePicture = `${
		process.env.REACT_APP_IMAGE_API
	}${profileUser?.substring(7)}`;

	const renderUserAddresses = () => {
		if (userAddresses.length) {
			return userAddresses?.map((user_address) => {
				return <CheckoutAddressCard userAddressData={user_address} />;
			});
		}
		return (
			<Card>
				<CardBody className="p-12">
					<h4 className="font-bold text-lg text-center">
						<span className="text-[22px]">
							Where should we send the goodies?
						</span>
						<br /> Drop your address here. <br /> We promise not to
						send a herd of elephants with your package!
					</h4>
				</CardBody>
			</Card>
		);
	};

	const handleRequestChangePassword = async () => {
		try {
			setIsLoading(true);

			const sendRequest = await axiosInstance(token).get(`users/reqPass`);

			if (!sendRequest.data.isError) {
				setIsLoading(false);

				toast.success(sendRequest.data.message, {
					style: {
						backgroundColor: "var(--background)",
						color: "var(--text)",
					},
				});
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		dispatch(onSetUserAddresses(token));
		window.scrollTo({ top: 0 });
	}, []);

	return (
		<>
			<Toaster />
			<Media
				queries={{
					medium: "(min-width: 768px)",
				}}
			>
				{(matches) => (
					<main className="profile-settings-page min-h-screen mx-4 md:max-w-[1000px] md:min-h-[90vh] md:mx-auto py-6">
						{matches.medium && (
							<div className="page-heading mb-4">
								<h3 className="font-bold text-headline-sm">
									Hi,{" "}
									<span className="capitalize">
										{username}
									</span>
									!
								</h3>
							</div>
						)}
						<section className="grid md:grid-cols-2 md:gap-x-4 md:pb-8">
							{matches.medium ? (
								<section className="profile-picture-section w-full h-full p-4 dark:bg-[#181818] rounded-xl border-2 border-neutral-600 border-opacity-20">
									<section className="profile-picture-section flex flex-col items-center">
										<div className="profile-picture min-w-[200px] max-w-[320px] mb-3">
											<Image
												src={
													profileUser
														? profilePicture
														: DefaultAvatar
												}
												alt=""
												className="w-full aspect-square object-cover"
											/>
											<div className="grid gap-y-2 pt-4">
												<ChangeProfilePictureModal />
												<Button
													fullWidth
													variant="bordered"
													onClick={() =>
														handleRequestChangePassword()
													}
													isLoading={isLoading}
													spinner={
														<MySpinner color="white" />
													}
												>
													<span className="font-medium">
														Reset Password
													</span>
												</Button>
											</div>
										</div>
									</section>
								</section>
							) : (
								<section className="flex justify-center dark:bg-[#181818] rounded-xl p-4 border-2 border-neutral-600 border-opacity-20">
									<div className="flex flex-col items-center">
										<ChangeProfilePictureModal />
										<div className="text-center mt-2 w-[180px]">
											<div className="leading-none mb-2">
												<h2 className="font-bold mb-1 text-[18px] capitalize truncate">
													{username}
												</h2>
												<h4 className="text-body-md opacity-60 truncate">
													{email}
												</h4>
											</div>
											<div className="pt-2">
												<Button
													fullWidth
													size="sm"
													variant="bordered"
													onClick={() =>
														handleRequestChangePassword()
													}
													isLoading={isLoading}
													spinner={
														<MySpinner color="white" />
													}
													className="max-w-[160px]"
												>
													<span className="font-medium">
														Reset Password
													</span>
												</Button>
											</div>
										</div>
									</div>
								</section>
							)}
							<section className="profile-biodata-section py-4 md:py-0 w-full grid gap-y-4">
								<section className="biodata grid gap-4 p-4 dark:bg-[#181818] rounded-xl border-2 border-neutral-600 border-opacity-20">
									<div className="flex justify-between items-center">
										<h4 className="font-bold text-lg mr-2">
											Personal Information
										</h4>
										<EditPersonalInformationModal />
									</div>
									<div className="flex w-full text-body-md md:text-body-lg overflow-hidden">
										<div className="md:min-w-[140px] md:w-[140px] min-w-[110px] w-[110px]">
											<p>Fullname</p>
										</div>
										<div className="flex-[1_1_100%] min-w-0 truncate font-bold">
											<p>{username}</p>
										</div>
									</div>
									<div className="flex w-full text-body-md md:text-body-lg overflow-hidden">
										<div className="md:min-w-[140px] md:w-[140px] min-w-[110px] w-[110px]">
											<p>Birthdate</p>
										</div>
										<div className="flex-[1_1_100%] min-w-0 truncate font-bold">
											<p>{birth_date || "-"}</p>
										</div>
									</div>
									<div className="flex w-full text-body-md md:text-body-lg overflow-hidden">
										<div className="md:min-w-[140px] md:w-[140px] min-w-[110px] w-[110px]">
											<p>Gender</p>
										</div>
										<div className="flex-[1_1_100%] min-w-0 truncate font-bold">
											<p>{gender || "-"}</p>
										</div>
									</div>
								</section>
								<section className="biodata grid gap-4 p-4 dark:bg-[#181818] rounded-xl border-2 border-neutral-600 border-opacity-20">
									<div className="flex justify-between items-center">
										<h4 className="font-bold text-lg mr-2">
											Personal Contact
										</h4>
										<EditPersonalContactModal />
									</div>
									<div className="flex w-full text-body-md md:text-body-lg overflow-hidden">
										<div className="md:min-w-[140px] md:w-[140px] min-w-[110px] w-[110px]">
											<p>Email</p>
										</div>
										<div className="flex-[1_1_100%] min-w-0 truncate font-bold">
											<p className="truncate">{email}</p>
										</div>
									</div>
									<div className="flex w-full text-body-md md:text-body-lg overflow-hidden">
										<div className="md:min-w-[140px] md:w-[140px] min-w-[110px] w-[110px]">
											<p>Status</p>
										</div>
										<div className="flex-[1_1_100%] min-w-0 truncate font-bold">
											<Chip
												radius="sm"
												size="sm"
												className={`${
													status === "verified"
														? "bg-primary-600"
														: "bg-red-600"
												}`}
											>
												<span className="font-white font-medium uppercase">
													{status}
												</span>
											</Chip>
										</div>
									</div>
									<div className="flex w-full text-body-md md:text-body-lg overflow-hidden">
										<div className="md:min-w-[140px] md:w-[140px] min-w-[110px] w-[110px]">
											<p>Phone</p>
										</div>
										<div className="flex-[1_1_100%] min-w-0 truncate font-bold">
											<p>
												{phone ? `+62 ${phone}` : "-"}
											</p>
										</div>
									</div>
								</section>
							</section>
						</section>
						<section className="address-list-section pt-8 pb-20">
							<div className="mb-2">
								<h1 className="font-bold text-xl">
									Address List
								</h1>
							</div>
							<div className="address-list">
								<div className="grid md:grid-cols-12 md:gap-x-4 gap-y-2">
									<Input
										type="text"
										placeholder="Search Address"
										className="md:col-span-9"
										isClearable
										startContent={
											<IoSearch opacity={".5"} />
										}
										variant="bordered"
									/>
									<CreateNewAddressModal
										userAddressesData={userAddresses}
									/>
								</div>
								<div className="mt-5 dark:bg-[#181818] rounded-xl border-2 border-neutral-600 p-5 border-opacity-20 overflow-y-auto h-[400px]">
									{renderUserAddresses()}
								</div>
							</div>
						</section>
					</main>
				)}
			</Media>
		</>
	);
};

export default ProfileSettingsPage;
