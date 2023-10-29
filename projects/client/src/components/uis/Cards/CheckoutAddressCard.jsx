import React, { useState } from "react";

import Media from "react-media";
import { Button } from "@nextui-org/react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const CheckoutAddressCard = ({ selected }) => {
	const [isSelected, setIsSelected] = useState(selected);

	return (
		<>
			<div
				className={`address-card flex justify-between items-center border-2 ${
					isSelected
						? "border-primary-500"
						: "border-neutral-300 dark:border-neutral-700"
				}  rounded-xl p-4`}
			>
				<section className="address-content w-[80%]">
					<div className="address-title flex items-center">
						<p className="font-bold text-label-lg md:text-body-lg text-gray-600 dark:text-[#dedede] mr-2">
							{`Home`}
						</p>
						{isSelected ? (
							<>
								<div className="chip-main-address bg-secondary-500 px-1 rounded-[4px]">
									<p className="font-medium text-[11px] md:text-label-lg text-white">
										Main
									</p>
								</div>
							</>
						) : null}
					</div>
					<div className="address-recipient-name">
						<p className="font-bold text-body-lg md:text-price-md">
							{`Albert Santoso Tandjung`}
						</p>
					</div>
					<div className="full-address text-label-md md:text-base">
						{`Jl. Jalan Jalan`}, Kota {`Tangerang`}, {`Banten`},{" "}
						{`19210`}
					</div>
				</section>
				<section className="actions">
					{isSelected ? (
						<>
							<IoCheckmarkCircleOutline
								size={28}
								className="text-primary-500"
							/>
						</>
					) : (
						<>
							<Media
								queries={{
									medium: "(min-width: 768px)",
								}}
							>
								{(matches) => (
									<Button
										color="primary"
										size={matches.medium ? "md" : "sm"}
										onPress={() =>
											setIsSelected(!isSelected)
										}
									>
										<span className="font-bold text-label-lg text-black">
											Select
										</span>
									</Button>
								)}
							</Media>
						</>
					)}
				</section>
			</div>
		</>
	);
};

export default CheckoutAddressCard;
