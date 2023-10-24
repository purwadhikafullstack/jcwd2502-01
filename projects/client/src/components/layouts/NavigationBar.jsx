import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { IoSearch, IoCartOutline } from "react-icons/io5";
import NexocompLogo from "../../assets/logo/NexocompLogo";
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
import NexoLogo from "../../assets/logo/NexoLogo";
import { useDispatch, useSelector } from "react-redux";
import { onSearch, setSearch } from "../../redux/features/products";
import { fetchCartAsync } from "../../redux/features/carts";
import NavigationBarMenu from "./NavigationBarMenu";

const NavigationBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const search = useSelector((state) => state.products.search);

	const count = useSelector((state) => state.carts.count);

	const formik = useFormik({
		initialValues: { searchQuery: "" },
		onSubmit: (values) => {
			// Handle the search query submission here
			dispatch(onSearch(values.searchQuery));
			navigate("/explore");
		},
	});

	useEffect(() => {
		dispatch(fetchCartAsync(1));
	}, []);

	useEffect(() => {
		formik.setFieldValue("searchQuery", search);
	}, [search]);

	return (
		<>
			<Navbar
				onMenuOpenChange={setIsMenuOpen}
				maxWidth="full"
				className="md:py-2 shadow-sm bg-background border-b-2 dark:border-neutral-800"
				isBlurred={false}
			>
				<NavbarContent className="hidden md:flex">
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
					<form className="w-full" onSubmit={formik.handleSubmit}>
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
				<NavbarContent justify="end">
					<Link to={"/cart"}>
						<Badge
							disableOutline
							content={count}
							shape="circle"
							size="sm"
							className="bg-red-500 text-white"
						>
							<Button
								isIconOnly
								aria-label="Cart"
								variant="flat"
								size="sm"
							>
								<IoCartOutline
									size={22}
									className="fill-accent"
								/>
							</Button>
						</Badge>
					</Link>
				</NavbarContent>
				<NavbarContent justify="end" className="gap-2 hidden md:flex">
					<NavbarItem className="">
						<Link to={"/login"}>
							<Button
								variant="ghost"
								color="primary"
								className="font-medium text-text"
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
