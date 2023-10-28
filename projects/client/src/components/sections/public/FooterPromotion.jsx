import React from "react";

import {
	IoFlashOutline,
	IoBagHandleOutline,
	IoStarOutline,
} from "react-icons/io5";

const FooterPromotion = () => {
	return (
		<>
			<section className="footer-promotion my-container select-none">
				<div className="py-8">
					<span className="section-title">
						<h2 className="font-bold text-headline-md md:text-headline-lg w-[240px] md:w-full mx-auto uppercase text-center text-primary-500">
							Why Buy from Nexocomp
						</h2>
					</span>
					<div className="grid-wrapper grid grid-cols-1 md:flex">
						<div className="item flex flex-col items-center my-8 md:w-[366px] md:mx-auto">
							<span className="my-2 w-[68px] h-[68px] flex justify-center items-center border-2 border-black dark:border-white rounded-full">
								<IoFlashOutline size={36} />
							</span>
							<h3 className="text-center font-bold text-title-lg w-[64%] my-2">
								Get First Dibs
							</h3>
							<p className="text-center text-body-md text-neutral-600 dark:text-neutral-400 w-[86%]">
								Nexocomp.com is the only place where you can buy
								our most anticipated gear immediately upon
								release.
							</p>
						</div>
						<div className="item flex flex-col items-center my-8 md:w-[366px] md:mx-auto">
							<span className="my-2 w-[68px] h-[68px] flex justify-center items-center border-2 border-black dark:border-white rounded-full">
								<IoBagHandleOutline size={36} />
							</span>
							<h3 className="text-center font-bold text-title-lg w-[64%] my-2">
								The Largest Array Of Gaming Gear
							</h3>
							<p className="text-center text-body-md text-neutral-600 dark:text-neutral-400 w-[86%]">
								Nexocomp hold a massive collection of products
								that can’t be matched anywhere else.
							</p>
						</div>
						<div className="item flex flex-col items-center my-8 md:w-[366px] md:mx-auto">
							<span className="my-2 w-[68px] h-[68px] flex justify-center items-center border-2 border-black dark:border-white rounded-full">
								<IoStarOutline size={36} />
							</span>
							<h3 className="text-center font-bold text-title-lg w-[64%] my-2">
								Official Warranty
							</h3>
							<p className="text-center text-body-md text-neutral-600 dark:text-neutral-400 w-[86%]">
								Nexocomp deals only in the real deal, offering
								nothing but authentic products.
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default FooterPromotion;
