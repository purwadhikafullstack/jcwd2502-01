import { useState } from 'react'

import { IoSearch, IoCartOutline } from "react-icons/io5"

import { Link } from "react-router-dom"
import NexocompLogo from '../../assets/logo/NexocompLogo';

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenu, NavbarMenuToggle, Input, NavbarMenuItem } from "@nextui-org/react";

const NavigationBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const menuItems = [
		"Profile",
		"Dashboard",
		"Activity",
		"Analytics",
		"System",
		"Deployments",
		"My Settings",
		"Team Settings",
		"Help & Feedback",
		"Log Out",
	];

	return (
		<>
			<Navbar onMenuOpenChange={setIsMenuOpen} maxWidth='full' className='py-2 shadow-sm bg-background border-b-2 dark:border-neutral-800' isBlurred={false}>
				<NavbarContent maxWidth={"120px"} >
					<NavbarMenuToggle
						aria-label={isMenuOpen ? "Close menu" : "Open menu"}
						className="sm:hidden"
					/>
					<NavbarBrand>
						<Link to={"/"}>
							<div className="-mb-1.5">
								<NexocompLogo width={140} fill={"fill-primary-500 dark:fill-primary-500"} />
							</div>
						</Link>
					</NavbarBrand>
				</NavbarContent>
				<NavbarContent className="hidden sm:flex gap-4 w-full" justify='center'>
					<Input type='text' placeholder='Search on Nexocomp' startContent={<IoSearch opacity={".5"} />} variant='bordered' fullWidth />
				</NavbarContent>
				<NavbarContent>
					<Button isIconOnly aria-label='Cart' variant='flat'>
						<IoCartOutline size={22} className='fill-accent' />
					</Button>
				</NavbarContent>
				<NavbarContent justify="end" className='gap-2'>
					<NavbarItem className="hidden lg:flex">
<<<<<<< HEAD
						<Button as={Link} className='bg-accent-500 text-white font-medium hover' href="#">
=======
						<Button as={Link} className='bg-secondary-500 text-black font-medium hover' href="#">
>>>>>>> 8ac879f3bba1277d3b209059f766ee026b6d7278
							Login
						</Button>
					</NavbarItem>
					<NavbarItem>
<<<<<<< HEAD
						<Button as={Link} className='bg-primary-500 text-accent-500 font-medium hover' href="#" >
=======
						<Button as={Link} className='bg-primary-500 text-black font-medium hover' href="#" >
>>>>>>> 8ac879f3bba1277d3b209059f766ee026b6d7278
							Sign Up
						</Button>
					</NavbarItem>
				</NavbarContent>
				<NavbarMenu>
					{menuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}`}>
							<Link
								color={
									index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
								}
								className="w-full"
								href="#"
								size="lg"
							>
								{item}
							</Link>
						</NavbarMenuItem>
					))}
				</NavbarMenu>
			</Navbar>
		</>
	)
}

export default NavigationBar