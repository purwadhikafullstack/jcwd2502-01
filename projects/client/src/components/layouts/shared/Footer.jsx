import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NexocompLogo from "../../../assets/logo/NexocompLogo";
import YourPrivacyChoices from "../../../assets/logo/YourPrivacyChoices";
import AppStore from "../../../assets/logo/appstore.svg";
import GooglePlay from "../../../assets/logo/googleplay.svg";
import { axiosInstance } from "../../../lib/axios";
import { useTranslation } from "react-i18next";

const Footer = () => {
	const { t } = useTranslation();
	const [categories, setCategories] = useState([]);

	const fetchCategoriesAsync = async () => {
		try {
			const accessToken = localStorage.getItem("accessToken");
			const { data } = await axiosInstance(accessToken).get(
				`categories/all`
			);

			setCategories(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchCategoriesAsync();
	}, []);

	return (
		<footer
			className={`footer border-t-2 dark:border-t-neutral-800 bg-background w-full z-[10]`}
		>
			<div className="my-container px-6 md:px-40">
				<div className="footer-body md:flex block pt-4 md:pt-12">
					<div className="footer-bottom md:pt-4 md:pb-12 mt-4 pb-12 hidden md:block">
						<span className="legal-logo flex flex-col justify-center items-start gap-6 w-full">
							<a href="/" className="-mb-1.5">
								<NexocompLogo
									width={140}
									fill={
										"fill-primary-500 dark:fill-primary-500"
									}
								/>
							</a>
							<h3 className="mt-[2px] md:text-base text-sm text-left">
								{t("rights")}
							</h3>
						</span>
					</div>
					<div className="menus-column w-full h-auto grid grid-cols-2 grid-rows-2 gap-x-6 my-4 md:ml-auto md:mt-0 md:w-[500px] md:flex md:justify-between md:pl-20 md:mb-20">
						<div className="footer-developer mt-2 md:mt-0 text-left order-last md:order-first">
							<h3 className="font-bold mb-2 md:mb-4">Nexocomp</h3>
							<div className="flex flex-col gap-2">
								<Link>
									<span className="hover:underline">
										{t("about_nexo")}
									</span>
								</Link>
								<Link>
									<span className="hover:underline">
										{t("copyright")}
									</span>
								</Link>
								<Link>
									<span className="hover:underline">
										{t("faqs")}
									</span>
								</Link>
							</div>
						</div>
						<div className="footer-social text-left">
							<h3 className="font-bold mb-2 md:mb-4">
								{t("socials")}
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
								{t("categories")}
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
				<div className="footer-bottom md:hidden md:pt-4 md:pb-12 mt-6 pb-12">
					<span className="legal-logo flex justify-center items-center gap-6 w-full">
						<a href="/" className="-mb-1.5">
							<NexocompLogo
								width={140}
								fill={"fill-primary-500 dark:fill-primary-500"}
							/>
						</a>
						<h3 className="mt-[2px] md:text-base text-sm text-left">
							{t("rights")}
						</h3>
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
