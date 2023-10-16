import React from 'react'

import ControllerCategory from "../../assets/images/categories-selection/controller.png"
import HeadphoneCategory from "../../assets/images/categories-selection/headphone.png"
import KeyboardCategory from "../../assets/images/categories-selection/keyboard.png"
import MouseCategory from "../../assets/images/categories-selection/mouse.png"
import MousepadCategory from "../../assets/images/categories-selection/mousepad.png"

const GearCategories = () => {
	return (
		<>
			<section className="gear-categories my-container">
				<div>
					<h2 className='font-bold text-headline-sm'>Gear Categories</h2>
					<div className="category-selections flex justify-evenly py-12">
						<div className="category-selection">
							<div className="category-thumbnail rounded-3xl relative flex justify-center bg-accent-400 w-[120px] h-[120px]">
								<img src={MouseCategory} alt="" className='w-24 absolute -top-4' />
							</div>
						</div>
						<div className="category-selection">
							<div className="category-thumbnail rounded-3xl relative flex justify-center bg-accent-400 w-[120px] h-[120px]">
								<img src={KeyboardCategory} alt="" className='w-full scale-125 rotate-[10deg] absolute top-4' />
							</div>
						</div>
						<div className="category-selection">
							<div className="category-thumbnail rounded-3xl relative flex justify-center bg-accent-400 w-[120px] h-[120px]">
								<img src={HeadphoneCategory} alt="" className='w-24 absolute -top-8' />
							</div>
						</div>
						<div className="category-selection">
							<div className="category-thumbnail rounded-3xl relative flex justify-center bg-accent-400 w-[120px] h-[120px]">
								<img src={ControllerCategory} alt="" className='w-full -rotate-[12deg] absolute -top-4 -left-4' />
							</div>
						</div>
						<div className="category-selection">
							<div className="category-thumbnail rounded-3xl relative flex justify-center bg-accent-400 w-[120px] h-[120px]">
								<img src={MousepadCategory} alt="" className='w-full scale-125 absolute' />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default GearCategories