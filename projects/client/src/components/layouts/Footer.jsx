import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa"
import NexocompLogo from '../../assets/logo/NexocompLogo';
import { Input } from '@nextui-org/react';
import YourPrivacyChoices from '../../assets/logo/YourPrivacyChoices';
import AppStore from "../../assets/logo/appstore.svg"
import GooglePlay from "../../assets/logo/googleplay.svg"

const Footer = () => {
	return (
		<>
			<footer className={`footer border-t-2 dark:border-t-neutral-800 bg-background w-full`}>
				<div className="my-container-mobile px-6">
					<div className="footer-body md:flex block pt-12">
						<div className="download-column mb-2 w-full text-left">
							<h3 className="font-bold text-lg md:mb-4">Download the app</h3>
							<div className="download-input w-[400px] hidden items-center justify-between relative md:flex">
								<form action="" className="w-full">
									<div>
										<Input
											type="email"
											name="email"
											id="email"
											placeholder="Enter email to get an update news"
											variant='bordered'
										/>
									</div>
								</form>
								<span className="pr-4 absolute right-0">
									<FaArrowRight />
								</span>
							</div>
							<p className="text-sm font-medium text-gray-400 mt-4 md:inline hidden">Message and data rates may apply.</p>
							<div className="download-links flex gap-2 py-2 items-center w-[300px] md:w-[360px] md:mt-6">
								<div className="app-store">
									<a href='https://'><img alt='Get it on AppStore' src={AppStore} className="w-[140px] md:w-[600px]" /></a>
								</div>
								<div className="play-store">
									<a href='https://'><img alt='Get it on Google Play' src={GooglePlay} className="w-[140px] md:w-[600px]" /></a>
								</div>
							</div>
						</div>
						<div className="menus-column w-full grid grid-cols-2 gap-y-4 gap-x-6 mb-4 mt-4 md:mt-0 md:flex md:justify-between md:pl-20">
							<div className="footer-social text-left">
								<h3 className="font-bold mb-2 md:mb-4">Social</h3>
								<div className="flex flex-col gap-2">
									<Link>
										<span className="hover:underline">Instagram</span>
									</Link>
									<Link>
										<span className="hover:underline">Twitter</span>
									</Link>
									<Link>
										<span className="hover:underline">Facebook</span>
									</Link>
								</div>
							</div>
							<div className="footer-categories text-left row-span-2">
								<h3 className="font-bold mb-2 md:mb-4">Categories</h3>
								<div className="flex flex-col gap-2">
									<Link>
										<span className="hover:underline">Mouse</span>
									</Link>
									<Link>
										<span className="hover:underline">Keyboard</span>
									</Link>
									<Link>
										<span className="hover:underline">Headset</span>
									</Link>
									<Link>
										<span className="hover:underline">Controller</span>
									</Link>
									<Link>
										<span className="hover:underline">Mousepad</span>
									</Link>
								</div>
							</div>
							<div className="footer-developer text-left">
								<h3 className="font-bold mb-2 md:mb-4">Use Nexocomp</h3>
								<div className="flex flex-col gap-2">
									<Link>
										<span className="hover:underline">Create an Event</span>
									</Link>
									<Link>
										<span className="hover:underline">Pricing</span>
									</Link>
									<Link>
										<span className="hover:underline">Content Standards</span>
									</Link>
									<Link>
										<span className="hover:underline">FAQs</span>
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="footer-bottom md:pt-10 mt-4 md:mt-20 gap-y-4 grid md:grid-cols-2 grid-cols-1 grid-rows-2 grid-flow-dense pb-12">
						<span className="legal-logo flex items-center gap-6 w-full">
							<a href="/" className='-mb-1.5'>
								<NexocompLogo width={140} fill={"fill-primary-500 dark:fill-primary-500"} />
							</a>
							<h3 className="mt-[2px] md:text-base text-sm text-left">© 2023 Nexocomp. All rights reserved.</h3>
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
								<li><a href="http://">Terms</a></li>
								<li><a href="http://">Privacy</a></li>
								<li><a href="http://">Site map</a></li>
							</ul>
						</span>
					</div>
				</div >
			</footer >
		</>
	)
}

export default Footer