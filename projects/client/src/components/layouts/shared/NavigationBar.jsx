import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { IoSearch, IoCartOutline } from "react-icons/io5";
import NexocompLogo from "../../../assets/logo/NexocompLogo";
import { toast } from "react-hot-toast";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Button,
	NavbarMenuToggle,
	Input,
	Badge,
} from "@nextui-org/react";
import NexoLogo from "../../../assets/logo/NexoLogo";
import { useDispatch, useSelector } from "react-redux";
import { onSearch, setSearch } from "../../../redux/features/products";
import { fetchCartAsync } from "../../../redux/features/carts";
import NavigationBarMenu from "./NavigationBarMenu";
import ProfileDropdown from "../../uis/Dropdowns/ProfileDropdown";

const NavigationBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [click, setClick] = useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const search = useSelector((state) => state.products.search);
	const { role, status } = useSelector((state) => state.user);

	const token = localStorage.getItem("accessToken");

	const count = useSelector((state) => state.carts.count);

	const handleDirect = () => {
		if (!click) return;

		if (role === "") {
			navigate("/login");
		} else if (status === "unverified") {
			toast.error("Must verify your email first!");
		} else {
			navigate("/cart");
		}
		setClick(false);
		setTimeout(() => setClick(true), 2000);
	};

	const formik = useFormik({
		initialValues: { searchQuery: "" },
		onSubmit: (values) => {
			// Handle the search query submission here
			dispatch(onSearch(values.searchQuery));
			navigate("/explore");
		},
	});

	const handleSubmitSearch = (e) => {
		e.preventDefault();
		formik.handleSubmit();
		window.scrollTo({ top: 0 });
	};

	useEffect(() => {
		dispatch(fetchCartAsync(token));
	}, []);

	useEffect(() => {
		formik.setFieldValue("searchQuery", search);
	}, [search]);

	return (
		<>
			<Navbar
				onMenuOpenChange={setIsMenuOpen}
				maxWidth="full"
				className="md:py-2 md:px-2 shadow-sm bg-background border-b-2 dark:border-neutral-800"
				isBlurred={false}
			>
				<NavbarContent className="hidden md:flex md:pr-2">
					<NavbarBrand>
						<Link to={"/"}>
							<div className="-mb-1.5 w-full">
								<NexocompLogo
									width={160}
									fill={"fill-primary-500"}
								/>
							</div>
						</Link>
					</NavbarBrand>
				</NavbarContent>
				<NavbarContent className="md:hidden flex">
					<NavbarBrand>
						<Link to={"/"}>
							<div className="w-full">
								<NexoLogo
									width={64}
									fill={"fill-primary-500"}
								/>
							</div>
						</Link>
					</NavbarBrand>
				</NavbarContent>
				<NavbarContent className="flex gap-4 w-full" justify="center">
					<form className="w-full" onSubmit={handleSubmitSearch}>
						<Input
							type="text"
							placeholder="Search on Nexocomp"
							isClearable
							onClear={() => dispatch(setSearch(""))}
							startContent={<IoSearch opacity={".5"} />}
							variant="bordered"
							fullWidth
							onChange={(e) =>
								formik.setFieldValue(
									"searchQuery",
									e.target.value
								)
							}
							value={formik.values.searchQuery}
						/>
					</form>
				</NavbarContent>
				<NavbarContent justify="end" className="hidden md:flex md:px-2">
					<Badge
						disableOutline
						content={count}
						shape="circle"
						size="md"
						className={`${
							role ? "" : "hidden"
						} bg-red-500 text-white`}
					>
						<Button
							isIconOnly
							aria-label="Cart"
							variant="flat"
							onClick={() => handleDirect()}
						>
							<IoCartOutline size={22} className="fill-accent" />
						</Button>
					</Badge>
				</NavbarContent>
				<NavbarContent justify="end" className="gap-2 hidden md:flex ">
					{token ? (
						<>
							<NavbarItem className="flex">
								<ProfileDropdown />
							</NavbarItem>
						</>
					) : (
						<>
							<NavbarItem className="">
								<Link to={"/login"}>
									<Button
										color="secondary"
										className="font-medium text-white"
										fullWidth
									>
										Login
									</Button>
								</Link>
							</NavbarItem>
							<NavbarItem className="">
								<Link to={"/signup"}>
									<Button className="bg-primary-500 text-black font-medium">
										Sign Up
									</Button>
								</Link>
							</NavbarItem>
						</>
					)}
				</NavbarContent>
				<NavbarContent className="sm:hidden">
					<NavbarMenuToggle
						aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					/>
				</NavbarContent>
				<NavigationBarMenu />
			</Navbar>
		</>
	);
};

export default NavigationBar;
