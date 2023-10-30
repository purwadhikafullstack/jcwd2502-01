import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import DefaultAvatar from "../../assets/avatars/default_avatar.png";
import { Image } from "@nextui-org/react";
import UpdateProfilePictureModal from "../../components/layouts/user/UpdateProfilePictureModal";

const ProfileSettingsPage = () => {
	const [openModal, setOpenModal] = useState(false);

	const { username, email, role } = useSelector((state) => state.user);

	const onOpenModal = () => {
		setOpenModal(!openModal);
	};

	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, []);

	return (
		<>
			<main className="profile-settings-page min-h-screen my-container py-4">
				<div className="page-heading mb-4">
					<h3 className="font-bold text-headline-md">
						Hi, {username}!
					</h3>
				</div>
				<section className="grid md:grid-cols-2">
					<section className="profile-picture-section w-1/2">
						<div className="left-side flex flex-col items-center mr-14">
							<div className="profile-picture w-[260px] mb-2">
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
					<section className="profile-biodata-section w-1/2">
						<div className="biodata">
							<h4>Username: {username}</h4>
							<h4>Email: {email}</h4>
							<h4>Status: VERIFIED</h4>
						</div>
					</section>
				</section>
			</main>
			<UpdateProfilePictureModal
				open={openModal}
				handleOpenUpdateProfilePictureModal={onOpenModal}
			/>
		</>
	);
};

export default ProfileSettingsPage;
