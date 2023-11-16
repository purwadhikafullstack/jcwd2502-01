import React, { useEffect, useState } from "react";
import {
	Avatar,
	Button,
	Chip,
	NavbarMenu,
	NavbarMenuItem,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../../uis/Buttons/ThemeToggle";
import { useDispatch, useSelector } from "react-redux";
import {
	IoSettingsOutline,
	IoLogOutOutline,
	IoCartOutline,
} from "react-icons/io5";
import DefaultAvatar from "../../../assets/avatars/default_avatar.png";
import TransactionList from "../../../assets/icons/TransactionList";
import { onLogout } from "../../../redux/features/users";
import SelectLang from "../../uis/Selects/SelectLang";

const NavigationBarMenu = () => {
	const { username, email, role } = useSelector((state) => state.user);
	const count = useSelector((state) => state.carts.count);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(onLogout());
		navigate("/");
		window.location.reload(false);
	};

	const [theme, setTheme] = useState(
		localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark"
	);

	const handleToggle = (e) => {
		if (e.target.checked) {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	};

	useEffect(() => {
		localStorage.setItem("theme", theme);
		const localTheme = localStorage.getItem("theme");
		document.querySelector("html").setAttribute("class", localTheme);
	}, [theme]);

	return (
		<NavbarMenu className="pt-4">
			<NavbarMenuItem className="mb-8">
				{role ? (
					<div className="profile-navigation-mobile flex items-center">
						<Avatar
							className="w-20 h-20 mr-4 text-large"
							color="secondary"
							src={DefaultAvatar}
						/>
						<div className="user-id">
							<h1 className="user-username font-bold text-[18px] leading-3">
								{username}
							</h1>
							<h3 className="user-email text-body-md">{email}</h3>
							<Chip className="bg-green-600" size="sm">
								<span className="text-label-md text-white uppercase">{`verified`}</span>
							</Chip>
						</div>
						<Link to={"/profile/settings"} className="ml-auto">
							<Button isIconOnly variant="flat" size="lg">
								<IoSettingsOutline size={26} />
							</Button>
						</Link>
					</div>
				) : (
					<div className="flex justify-between gap-2">
						<Link to={"/login"} className="w-full">
							<Button
								color="secondary"
								className="font-medium text-white"
								fullWidth
							>
								Login
							</Button>
						</Link>
						<Link to={"/signup"} className="w-full">
							<Button
								className="bg-primary-500 text-black font-medium"
								fullWidth
							>
								Sign Up
							</Button>
						</Link>
					</div>
				)}
			</NavbarMenuItem>
			<NavbarMenuItem>
				<Link to={"/order-list"}>
					<Button
						fullWidth
						variant="flat"
						className="flex justify-start bg-transparent px-0"
					>
						<TransactionList fill={"fill-text"} size={26} />
						<h4 className="font-medium text-[20px]">
							Transaction History
						</h4>
					</Button>
				</Link>
			</NavbarMenuItem>
			<NavbarMenuItem>
				<Link to={role ? "/cart" : "/login"}>
					<Button
						fullWidth
						variant="flat"
						className="flex justify-start bg-transparent px-0"
					>
						<IoCartOutline size={26} className="fill-text" />
						<h4 className="font-medium text-[20px]">Cart</h4>
						{role && (
							<Chip size="sm" className="bg-red-500">
								<span className="text-label-md text-white">
									{count}
								</span>
							</Chip>
						)}
					</Button>
				</Link>
			</NavbarMenuItem>
			<NavbarMenuItem className="mb-4 mt-auto text-right">
				<div className="flex justify-between items-center mb-4">
					<p className="font-medium text-body-lg">Change Language</p>
					<SelectLang />
				</div>
				<div className="flex justify-between items-center">
					<p className="font-medium text-body-lg">Change Theme</p>
					<ThemeToggle
						handleToggle={handleToggle}
						theme={theme}
						display={"flex"}
					/>
				</div>
			</NavbarMenuItem>
			{role && (
				<NavbarMenuItem className="mb-8">
					<Button
						className="bg-red-500"
						onClick={handleLogout}
						fullWidth
					>
						<IoLogOutOutline size={20} className="text-white" />
						<span className="text-white font-medium">Logout</span>
					</Button>
				</NavbarMenuItem>
			)}
		</NavbarMenu>
	);
};

export default NavigationBarMenu;
