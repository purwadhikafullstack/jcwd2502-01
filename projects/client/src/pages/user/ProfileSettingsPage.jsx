import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultAvatar from "../../assets/avatars/default_avatar.png";
import { Input, Image, Chip, Button } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import CheckoutAddressCard from "../../components/uis/Cards/CheckoutAddressCard";
import CreateNewAddressModal from "../../components/layouts/user/CreateNewAddressModal";
import { onSetUserAddresses } from "../../redux/features/users";
import EditPersonalInformationModal from "../../components/layouts/user/EditPersonalInformationModal";

import EditPersonalContactModal from "../../components/layouts/user/EditPersonalContactModal";
import Media from "react-media";
import ChangeProfilePictureModal from "../../components/layouts/user/ChangeProfilePictureModal";

const ProfileSettingsPage = () => {
	const dispatch = useDispatch();
	const token = localStorage.getItem("accessToken");
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
		return userAddresses?.map((user_address) => {
			return <CheckoutAddressCard userAddressData={user_address} />;
		});
	};

	useEffect(() => {
		dispatch(onSetUserAddresses(token));
		window.scrollTo({ top: 0 });
	}, []);

	return (
		<Media
			queries={{
				medium: "(min-width: 768px)",
			}}
		>
			{(matches) => (
				<main className="profile-settings-page min-h-screen mx-4 md:max-w-[1000px] md:min-h-[90vh] md:mx-auto py-4">
					{matches.medium && (
						<div className="page-heading mb-4">
							<h3 className="font-bold text-headline-sm">
								Hi,{" "}
								<span className="capitalize">{username}</span>!
							</h3>
						</div>
					)}
					<section className="grid md:grid-cols-2 md:gap-x-4 md:mb-8">
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
									<div className="text-center mt-2">
										<div className="leading-none mb-2">
											<h2 className="font-bold mb-1 text-[18px] capitalize">
												{username}
											</h2>
											<h4 className="text-body-md opacity-60">
												{email}
											</h4>
										</div>
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
								<div className="flex w-full text-body-md overflow-hidden">
									<div className="min-w-[140px] w-[140px]">
										<p>Username</p>
									</div>
									<div className="flex-[1_1_100%] min-w-0 truncate">
										<p>{username}</p>
									</div>
								</div>
								<div className="flex w-full text-body-md overflow-hidden">
									<div className="min-w-[140px] w-[140px]">
										<p>Birthdate</p>
									</div>
									<div className="flex-[1_1_100%] min-w-0 truncate">
										<p>{birth_date || "-"}</p>
									</div>
								</div>
								<div className="flex w-full text-body-md overflow-hidden">
									<div className="min-w-[140px] w-[140px]">
										<p>Gender</p>
									</div>
									<div className="flex-[1_1_100%] min-w-0 truncate">
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
								<div className="flex w-full text-body-md overflow-hidden">
									<div className="min-w-[140px] w-[140px]">
										<p>Email</p>
									</div>
									<div className="flex-[1_1_100%] min-w-0 truncate">
										<p className="truncate">{email}</p>
									</div>
								</div>
								<div className="flex w-full text-body-md overflow-hidden">
									<div className="min-w-[140px] w-[140px]">
										<p>Status</p>
									</div>
									<div className="flex-[1_1_100%] min-w-0 truncate">
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
								<div className="flex w-full text-body-md overflow-hidden">
									<div className="min-w-[140px] w-[140px]">
										<p>Phone</p>
									</div>
									<div className="flex-[1_1_100%] min-w-0 truncate">
										<p>{phone || "-"}</p>
									</div>
								</div>
							</section>
						</section>
					</section>
					<section className="">
						<div className="mb-2">
							<h1 className="font-bold text-xl">Address List</h1>
						</div>
						<div>
							<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
								<Input
									type="text"
									placeholder="Search Address"
									className=""
									isClearable
									size="md"
									startContent={<IoSearch opacity={".5"} />}
									variant="bordered"
								/>
								<CreateNewAddressModal />
							</div>
							<div className="mt-5">{renderUserAddresses()}</div>
						</div>
					</section>
				</main>
			)}
		</Media>
	);
};

export default ProfileSettingsPage;
