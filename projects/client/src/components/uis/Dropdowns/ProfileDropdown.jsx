import React from "react";

import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Avatar,
	User,
	Chip,
} from "@nextui-org/react";

import DefaultAvatar from "../../../assets/avatars/default_avatar.png";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../../../redux/features/users";
import { Link, useNavigate } from "react-router-dom";
import TransactionList from "../../../assets/icons/TransactionList";

const ProfileDropdown = () => {
	const { username } = useSelector((state) => state.user);
	const { email, status } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(onLogout());
		navigate("/");
		window.location.reload(false);
	};

	return (
		<Dropdown placement="bottom-end">
			<DropdownTrigger>
				<User
					as="button"
					avatarProps={{
						src: DefaultAvatar,
					}}
					className="transition-transform font-bold"
					name={`${username}`}
				/>
			</DropdownTrigger>
			<DropdownMenu aria-label="User Actions" variant="flat">
				<DropdownItem key="profile" className="h-full w-full">
					<div className="profile-navigation-mobile flex items-center h-full p-2">
						<Avatar
							className="w-20 h-20 mr-2 text-large"
							color="secondary"
							src={DefaultAvatar}
						/>
						<div className="user-id">
							<h1 className="user-username font-bold text-[18px]">
								{`${username}`}
							</h1>
							<h3 className="user-email text-body-md mb-2">
								{`${email}`}
							</h3>
							{status === "unverified" ? (
								<Chip className="bg-red-600" size="sm">
									<span className="text-label-md text-white uppercase">{`unverified`}</span>
								</Chip>
							) : (
								<Chip className="bg-green-600" size="sm">
									<span className="text-label-md text-white uppercase">{`verified`}</span>
								</Chip>
							)}
						</div>
					</div>
				</DropdownItem>
				<DropdownItem key="settings">
					<Link to={"/profile/settings"}>
						<div className="flex items-center gap-2 p-2">
							<IoSettingsOutline size={24} />
							<h4 className="font-medium text-body-lg">
								Settings
							</h4>
						</div>
					</Link>
				</DropdownItem>
				<DropdownItem key="settings">
					<Link to={"/order-list"}>
						<div className="flex items-center gap-2 p-2">
							<TransactionList
								fill={"fill-text -ml-[0.8px]"}
								size={24}
							/>
							<h4 className="font-medium text-body-lg">
								Transaction History
							</h4>
						</div>
					</Link>
				</DropdownItem>
				<DropdownItem
					key="logout"
					color="danger"
					onClick={() => handleLogout()}
				>
					<div className="flex items-center gap-2 p-2">
						<IoLogOutOutline size={24} />
						<h4 className="font-medium text-body-lg">Logout</h4>
					</div>{" "}
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};

export default ProfileDropdown;
