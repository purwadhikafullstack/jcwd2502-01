import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NexocompLogo from "../../../assets/logo/NexocompLogo";
import YourPrivacyChoices from "../../../assets/logo/YourPrivacyChoices";
import AppStore from "../../../assets/logo/appstore.svg";
import GooglePlay from "../../../assets/logo/googleplay.svg";
import { axiosInstance } from "../../../lib/axios";

const Footer = () => {
	const [categories, setCategories] = useState([]);

	const fetchCategoriesAsync = async () => {
		try {
			const { data } = await axiosInstance().get(`categories/all`);

			setCategories(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchCategoriesAsync();
	}, []);

	return (
		<>
			<footer
				className={`footer border-t-2 dark:border-t-neutral-800 bg-background w-full z-[10]`}
			>
				<div className="my-container px-6">
					<div className="footer-body md:flex block pt-12">
						<div className="download-column mb-2 w-full text-left">
							<h3 className="font-bold text-lg md:mb-4">
								Download the app
							</h3>
							<div className="download-links flex gap-2 py-2 items-center w-[300px] md:w-[360px] md:mt-2">
								<div className="app-store">
									<a href="">
										<img
											alt="Download on the App Store"
											src={AppStore}
											className="h-[40px] md:h-[52px]"
										/>
									</a>
								</div>
								<div className="play-store">
									<a href="">
										<img
											alt="Get it on Google Play"
											src={GooglePlay}
											className="h-[40px] md:h-[52px]"
										/>
									</a>
								</div>
							</div>
						</div>
						<div className="menus-column w-full h-auto grid grid-cols-2 grid-rows-2 gap-x-6 my-4 md:mt-0 md:flex md:justify-between md:pl-20">
							<div className="footer-developer mt-2 md:mt-0 text-left order-last md:order-first">
								<h3 className="font-bold mb-2 md:mb-4">
									Nexocomp
								</h3>
								<div className="flex flex-col gap-2">
									<Link>
										<span className="hover:underline">
											About Nexocomp
										</span>
									</Link>
									<Link>
										<span className="hover:underline">
											Copyright
										</span>
									</Link>
									<Link>
										<span className="hover:underline">
											FAQs
										</span>
									</Link>
								</div>
							</div>
							<div className="footer-social text-left">
								<h3 className="font-bold mb-2 md:mb-4">
									Socials
								</h3>
								<div className="flex flex-col gap-2">
									<Link>
										<span className="hover:underline">
											Instagram
										</span>
									</Link>
									<Link>
										<span className="hover:underline">
											Twitter
										</span>
									</Link>
									<Link>
										<span className="hover:underline">
											Facebook
										</span>
									</Link>
								</div>
							</div>
							<div className="footer-categories text-left row-span-2">
								<h3 className="font-bold mb-2 md:mb-4">
									Categories
								</h3>
								<div className="flex flex-col gap-2">
									{categories?.map((category) => {
										return (
											<Link
												to={`/explore?category=${category?.id}`}
												key={category?.category_type}
											>
												<span className="hover:underline">
													{category?.category_type}
												</span>
											</Link>
										);
									})}
								</div>
							</div>
						</div>
					</div>
					<div className="footer-bottom md:pt-4 mt-4 md:mt-14 gap-y-4 grid md:grid-cols-2 grid-cols-1 grid-rows-2 grid-flow-dense pb-12 md:pb-0">
						<span className="legal-logo flex items-center gap-6 w-full">
							<a href="/" className="-mb-1.5">
								<NexocompLogo
									width={140}
									fill={
										"fill-primary-500 dark:fill-primary-500"
									}
								/>
							</a>
							<h3 className="mt-[2px] md:text-base text-sm text-left">
								© 2023 Nexocomp. All rights reserved.
							</h3>
						</span>
						<span className="legal-links w-full">
							<ul className="flex flex-wrap md:justify-between items-center gap-4 font-medium text-gray-500">
								<li>
									<button className="flex items-center">
										<YourPrivacyChoices />
										<span className="ml-2">
											Your privacy choices
										</span>
									</button>
								</li>
								<li>
									<a href="">Terms</a>
								</li>
								<li>
									<a href="">Privacy</a>
								</li>
								<li>
									<a href="">Site map</a>
								</li>
							</ul>
						</span>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
