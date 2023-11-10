import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultAvatar from "../../assets/avatars/default_avatar.png";
import { Input, Image, Button, Tooltip } from "@nextui-org/react";
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
		<div className="bg-background">
			<main className="profile-settings-page min-h-screen my-container py-4 ">
				<div
					className={`
					border-2 border-gray-300
				dark:border-white
					md:p-10 p-5`}
				>
					<div className="page-heading mb-4">
						<h3 className="font-bold text-headline-md">
							Hi, <span className="uppercase">{username}</span>!
						</h3>
					</div>
					<section className="grid md:grid-cols-2">
						<section className="profile-picture-section md:w-1/2">
							<div
								className={`md:left-side md:w-full flex flex-col items-center md:mr-10 p-3 rounded-md bg-neutral-100 dark:bg-black
								`}
							>
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
						<section className="profile-biodata-section md:w-1/2 md:mt-0 mt-5">
							<div className="biodata text-lg">
								<div className="flex items-center mb-4">
									<h4 className="text-xl font-bold ">
										Personal Information
									</h4>
									<EditPersonalInformationModal />
								</div>
								<h4>Username: {`${username}`}</h4>
								<h4>
									Birth of Date:{" "}
									{birth_date ? birth_date : "-"}
								</h4>
								<h4>Gender: {gender ? gender : "-"}</h4>
							</div>
							<div className="biodata text-lg">
								<div className="flex items-center mb-4">
									<h4 className="text-xl font-bold">
										Personal Contact
									</h4>
									<EditPersonalContactModal />
								</div>
								<h4>Email: {email}</h4>
								<h4>
									Status:{" "}
									{status === "unverified" ? (
										<span className="text-white font-bold p-1 rounded-md bg-red-500 text-sm uppercase">
											{status}
										</span>
									) : (
										<span className="text-white font-bold p-2 rounded-md bg-green-500 text-sm uppercase">
											{status}
										</span>
									)}
								</h4>
								<h4>Phone: {phone ? phone : "-"}</h4>
							</div>
						</section>
					</section>
					<section className="w-full mt-10">
						<h1 className="uppercase text-headline-md font-bold">
							Address
						</h1>
						<div
							className={`md:px-5 px-3 md:py-7 py-5 mt-5 border-2 
							${theme === "light" ? "border-2 border-gray-300" : "border-2 border-white"} 
							`}
						>
							{/* <button className="">+ Add Address</button> */}
							<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
								<Input
									type="text"
									placeholder="Search Address"
									className="md:w-96"
									isClearable
									size="lg"
									// onClear={}
									startContent={<IoSearch opacity={".5"} />}
									variant="bordered"
								/>
								{/* <Button
									className="bg-primary-500 text-black font-bold hover"
									// fullWidth
									size="lg"
									type="submit"

								>
									+ Add Address
								</Button> */}
								<CreateNewAddressModal />
							</div>
							<div className="mt-5">{renderUserAddresses()}</div>
						</div>
					</section>
				</div>
			</main>
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
		</div>
	);
};

export default ProfileSettingsPage;
