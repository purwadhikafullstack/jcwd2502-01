import React from "react";

import ControllerCategory from "../../../assets/images/categories-selection/controller.png";
import HeadphoneCategory from "../../../assets/images/categories-selection/headphone.png";
import KeyboardCategory from "../../../assets/images/categories-selection/keyboard.png";
import MouseCategory from "../../../assets/images/categories-selection/mouse.png";
import MousepadCategory from "../../../assets/images/categories-selection/mousepad.png";
import MonitorCategory from "../../../assets/images/categories-selection/monitor.png";
import CategorySelection from "../../uis/CategorySelection/CategorySelection";

const GearCategories = () => {
	return (
		<>
			<section className="gear-categories my-container">
				<div className="wrapper py-6">
					<h2 className="font-bold text-headline-sm md:text-headline-lg text-center mb-4">
						Hottest Gear Categories
					</h2>
					<div className="category-selections md:flex md:justify-between pt-6 md:py-10 flex flex-wrap justify-center gap-4">
						<CategorySelection
							subtitle={"Mouse"}
							image={
								<img
									src={MouseCategory}
									alt=""
									className="w-20 md:w-24 absolute -top-4 right-3 group-hover:scale-105 ease-in-out duration-200 group-hover:rotate-2 group-hover:drop-shadow-xl"
								/>
							}
							categoryId={1}
						/>
						<CategorySelection
							subtitle={"Keyboard"}
							image={
								<img
									src={KeyboardCategory}
									alt=""
									className="w-20 md:w-full scale-[1.4] md:scale-[1.35] -rotate-[10deg] absolute top-6 left-2 md:left-0 md:top-6 group-hover:scale-[1.45] group-hover:-rotate-[6deg] duration-200 ease-in-out group-hover:drop-shadow-xl"
								/>
							}
							categoryId={2}
						/>
						<CategorySelection
							subtitle={"Controller"}
							image={
								<img
									src={ControllerCategory}
									alt=""
									className="w-full absolute -top-2 -left-2 md:-top-4 md:-left-4 group-hover:scale-105 group-hover:rotate-2 duration-200 ease-in-out group-hover:drop-shadow-xl"
								/>
							}
							categoryId={3}
						/>
						<CategorySelection
							subtitle={"Headset"}
							image={
								<img
									src={HeadphoneCategory}
									alt=""
									className="w-20 md:w-24 absolute -top-6 left-2 md:left-3 md:-top-8 group-hover:scale-105 duration-200 group-hover:rotate-2 ease-in-out group-hover:drop-shadow-xl"
								/>
							}
							categoryId={4}
						/>
						<CategorySelection
							subtitle={"Monitor"}
							image={
								<img
									src={MonitorCategory}
									alt=""
									className="w-[90px] md:w-[100px] absolute -top-2 right-1 md:right-2 group-hover:scale-[1.06] group-hover:rotate-2 duration-200 ease-in-out group-hover:drop-shadow-xl"
								/>
							}
							categoryId={5}
						/>
						<CategorySelection
							subtitle={"Mousepad"}
							image={
								<img
									src={MousepadCategory}
									alt=""
									className="w-[86px] md:w-full scale-150 absolute top-4 left-2 md:left-0 skew-y-12 -skew-x-12 group-hover:scale-[1.6] group-hover:rotate-2 duration-200 ease-in-out group-hover:drop-shadow-xl"
								/>
							}
							categoryId={6}
						/>
					</div>
				</div>
			</section>
		</>
	);
};

export default GearCategories;
