import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultAvatar from "../../assets/avatars/default_avatar.png";
import { Input, Image, Button, Tooltip, User, Chip } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import UpdateProfilePictureModal from "../../components/layouts/user/UpdateProfilePictureModal";
import CheckoutAddressCard from "../../components/uis/Cards/CheckoutAddressCard";
import { axiosInstance } from "../../lib/axios";
import CreateNewAddressModal from "../../components/layouts/user/CreateNewAddressModal";
import { onSetUserAddresses } from "../../redux/features/users";
import EditPersonalInformationModal from "../../components/layouts/user/EditPersonalInformationModal";
import EditPersonalContactModal from "../../components/layouts/user/EditPersonalContactModal";
import { BiEdit } from "react-icons/bi";
import { useStateContext } from "../../contexts/ContextProvider";
import Media from "react-media";

const ProfileSettingsPage = () => {
	const dispatch = useDispatch();
	const [openModal, setOpenModal] = useState(false);
	const { openEditWarehouseModal, setOpenEditWarehouseModal } =
		useStateContext();
	const onOpenEditWarehouseModal = (warehouse_id) => {
		setOpenEditWarehouseModal(!openEditWarehouseModal);
		// setSelectedWarehouseId(warehouse_id);
	};
	let localTheme = localStorage.getItem("theme");
	const token = localStorage.getItem("accessToken");
	const {
		username,
		email,
		role,
		userAddresses,
		status,
		phone,
		gender,
		birth_date,
		theme,
	} = useSelector((state) => state.user);
	const onOpenModal = () => {
		setOpenModal(!openModal);
	};

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
		<>
			<Media
				queries={{
					medium: "(min-width: 768px)",
				}}
			>
				{(matches) => (
					<main className="profile-settings-page min-h-screen my-container py-4">
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
						<section className="grid md:grid-cols-2">
							{matches.medium ? (
								<section className="profile-picture-section md:w-1/2">
									<div className={``}>
										<div className="profile-picture min-w-[200px] mb-3">
											<Image
												src={DefaultAvatar}
												alt=""
												className="w-full h-full aspect-square object-cover"
											/>
										</div>
										<span
											className="font-medium text-blue-600 hover:underline hover:cursor-pointer"
											onClick={onOpenModal}
										>
											Change profile photo
										</span>
									</div>
								</section>
							) : (
								<section className="flex justify-center dark:bg-[#181818] rounded-xl p-4 border-2 border-neutral-600 border-opacity-20">
									<div className="flex flex-col items-center">
										<div className="profile-picture w-[112px]">
											<Image
												src={DefaultAvatar}
												alt=""
												className="w-full h-full rounded-full aspect-square object-cover"
											/>
										</div>
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
							<section className="profile-biodata-section py-2 w-full">
								<section className="biodata grid gap-4 my-4 p-4 dark:bg-[#181818] rounded-xl border-2 border-neutral-600 border-opacity-20">
									<div className="flex justify-between items-center">
										<h4 className="font-bold text-lg mr-2">
											Personal Information
										</h4>
										<EditPersonalInformationModal />
									</div>
									<div className="flex w-full text-body-md">
										<div className="min-w-[140px] w-[140px]">
											<p>Username</p>
										</div>
										<div className="w-[170px] line-clamp-1">
											<p>{username}</p>
										</div>
									</div>
									<div className="flex w-full text-body-md">
										<div className="min-w-[140px] w-[140px]">
											<p>Birthdate</p>
										</div>
										<div className="w-[170px] line-clamp-1">
											<p>{birth_date || "-"}</p>
										</div>
									</div>
									<div className="flex w-full text-body-md">
										<div className="min-w-[140px] w-[140px]">
											<p>Gender</p>
										</div>
										<div className="w-[170px] line-clamp-1">
											<p>{gender || "-"}</p>
										</div>
									</div>
								</section>
								<section className="biodata grid gap-4 my-4 p-4 dark:bg-[#181818] rounded-xl border-2 border-neutral-600 border-opacity-20">
									<div className="flex justify-between items-center">
										<h4 className="font-bold text-lg mr-2">
											Personal Contact
										</h4>
										<EditPersonalContactModal />
									</div>
									<div className="flex w-full text-body-md">
										<div className="min-w-[140px] w-[140px]">
											<p>Email</p>
										</div>
										<div className="w-[170px]">
											<p className="w-[170px] truncate">
												albertsantosotandjung@gmail.com
											</p>
										</div>
									</div>
									<div className="flex w-full text-body-md">
										<div className="min-w-[140px] w-[140px]">
											<p>Status</p>
										</div>
										<div className="w-[170px] line-clamp-1">
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
									<div className="flex w-full text-body-md">
										<div className="min-w-[140px] w-[140px]">
											<p>Phone</p>
										</div>
										<div className="w-[170px] line-clamp-1">
											<p>{phone || "-"}</p>
										</div>
									</div>
								</section>
							</section>
						</section>
						<section className="w-full">
							<div className="mb-2">
								<h1 className="font-bold text-lg">Address</h1>
							</div>
							<div>
								<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
									<Input
										type="text"
										placeholder="Search Address"
										className=""
										isClearable
										size="md"
										// onClear={}
										startContent={
											<IoSearch opacity={".5"} />
										}
										variant="bordered"
									/>
									<CreateNewAddressModal />
								</div>
								<div className="mt-5">
									{renderUserAddresses()}
								</div>
							</div>
						</section>
					</main>
				)}
			</Media>

			<UpdateProfilePictureModal
				open={openModal}
				handleOpenUpdateProfilePictureModal={onOpenModal}
			/>
			{openEditWarehouseModal ? (
				<EditPersonalInformationModal
					handleOpenEditWarehouseModal={onOpenEditWarehouseModal}
					// warehouseId={selectedWarehouseId}
				/>
			) : null}
		</>
	);
};

export default ProfileSettingsPage;
