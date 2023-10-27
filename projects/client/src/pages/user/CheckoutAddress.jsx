import React from "react";

import { IoLocationSharp } from "react-icons/io5";
import ChooseAddressModal from "../../components/layouts/ChooseAddressModal";

const CheckoutAddress = () => {
	return (
		<>
			<section className="checkout-address p-4 mb-4 md:p-6 bg-neutral-100 dark:bg-neutral-900 md:rounded-xl">
				<p className="text-body-lg font-medium mb-2">
					Your shipping address
				</p>
				<div className="wrapper flex items-center justify-between md:block">
					<div className="selected-address w-[84%] md:w-full">
						<p className="flex items-center text-body-lg md:text-title-lg font-bold">
							<IoLocationSharp className="fill-primary-600 md:mr-2" />
							{`Home`} • {`Recipient's Name`}
						</p>
						<p className="text-label-lg md:text-body-lg line-clamp-1 md:line-clamp-none">
							Jl. Zeta Raya, Kota Tangerang, Banten, 15138
						</p>
					</div>
					<ChooseAddressModal />
				</div>
			</section>
		</>
	);
};

export default CheckoutAddress;
