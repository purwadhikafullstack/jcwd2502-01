import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DefaultAvatar from "../../assets/avatars/default_avatar.png";
import { Image } from "@nextui-org/react";
import UpdateProfilePictureModal from "../../components/layouts/user/UpdateProfilePictureModal";

const ProfileSettingsPage = () => {
	const [openModal, setOpenModal] = useState(false);
	let localTheme = localStorage.getItem("theme");
	// const [theme, setTheme] = useState(null);
	const { username, email, role, status, phone, gender, birth_date, theme } =
		useSelector((state) => state.user);
	const onOpenModal = () => {
		setOpenModal(!openModal);
	};
	// console.log(theme);
	useEffect(() => {
		console.log(theme);
		// if (localTheme === "dark") {
		// 	setTheme("dark");
		// } else {
		// 	setTheme("light");
		// }
		// console.log(theme);
	}, [theme]);

	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, []);

	return (
		<>
			<main className="profile-settings-page min-h-screen my-container py-4 ">
				<div
					className={`${
						theme === "light"
							? "border-2 border-gray-300"
							: "border-2 border-white"
					} md:p-10 p-5`}
				>
					<div className="page-heading mb-4">
						<h3 className="font-bold text-headline-md">
							Hi, <span className="uppercase">{username}</span>!
						</h3>
					</div>
					<section className="grid md:grid-cols-2">
						<section className="profile-picture-section md:w-1/2">
							<div
								className={`md:left-side md:w-full flex flex-col items-center md:mr-10 p-3 rounded-md  ${
									theme === "light"
										? "shadow-xl bg-white"
										: " bg-neutral-800"
								}`}
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
								<h4 className="text-xl font-bold mb-4">
									Personal Information
								</h4>
								<h4>Username: {username}</h4>
								<h4>
									Birth of Date:{" "}
									{birth_date ? birth_date : "-"}
								</h4>
								<h4>Gender: {gender ? gender : "-"}</h4>
								<h4 className="text-xl font-bold my-4">
									Personal Contact
								</h4>
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
				</div>
			</main>
			<UpdateProfilePictureModal
				open={openModal}
				handleOpenUpdateProfilePictureModal={onOpenModal}
			/>
		</>
	);
};

export default ProfileSettingsPage;
