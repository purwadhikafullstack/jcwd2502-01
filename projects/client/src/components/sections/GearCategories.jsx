import React from 'react'

import ControllerCategory from "../../assets/images/categories-selection/controller.png"
import HeadphoneCategory from "../../assets/images/categories-selection/headphone.png"
import KeyboardCategory from "../../assets/images/categories-selection/keyboard.png"
import MouseCategory from "../../assets/images/categories-selection/mouse.png"
import MousepadCategory from "../../assets/images/categories-selection/mousepad.png"

const GearCategories = () => {
	return (
		<>
			<section className="gear-categories my-container-mobile">
				<div className='wrapper py-6'>
					<h2 className='font-bold text-headline-lg text-center mb-2'>Gear Categories</h2>
					<div className="category-selections md:flex md:justify-evenly py-10 flex flex-wrap justify-center gap-4">
						<button className="group category-selection flex flex-col items-center justify-center">
							<div className="category-thumbnail rounded-3xl relative md:flex md:justify-center bg-secondary-400 group-hover:bg-accent-500 duration-200 aspect-square w-[100px] h-[100px] md:w-[120px] md:h-[120px]">
								<img src={MouseCategory} alt="" className='w-20 md:w-24 absolute -top-4 group-hover:scale-105 ease-in-out duration-200 group-hover:rotate-2' />
							</div>
							<p className='font-medium'>Mouse</p>
						</button>
						<button className="group category-selection flex flex-col items-center justify-center">
							<div className="category-thumbnail rounded-3xl relative md:flex md:justify-center bg-secondary-400 group-hover:bg-accent-500 duration-200 aspect-square w-[100px] h-[100px] md:w-[120px] md:h-[120px]">
								<img src={KeyboardCategory} alt="" className='w-20 md:w-full scale-[1.35] -rotate-[10deg] absolute top-6 group-hover:scale-[1.45] group-hover:-rotate-[6deg] duration-200 ease-in-out' />
							</div>
							<p className='font-medium'>Keyboard</p>
						</button>
						<button className="group category-selection flex flex-col items-center justify-center">
							<div className="category-thumbnail rounded-3xl relative md:flex md:justify-center bg-secondary-400 group-hover:bg-accent-500 duration-200 aspect-square w-[100px] h-[100px] md:w-[120px] md:h-[120px]">
								<img src={HeadphoneCategory} alt="" className='w-20 md:w-24 absolute -top-8 group-hover:scale-105 duration-200 group-hover:rotate-2 ease-in-out' />
							</div>
							<p className='font-medium'>Headset</p>
						</button>
						<button className="group category-selection flex flex-col items-center justify-center">
							<div className="category-thumbnail rounded-3xl relative md:flex md:justify-center bg-secondary-400 group-hover:bg-accent-500 duration-200 aspect-square w-[100px] h-[100px] md:w-[120px] md:h-[120px]">
								<img src={ControllerCategory} alt="" className='w-20 md:w-full absolute -top-4 -left-4 group-hover:scale-105 group-hover:rotate-2 duration-200 ease-in-out' />
							</div>
							<p className='font-medium'>Controller</p>
						</button>
						<button className="group category-selection flex flex-col items-center justify-center">
							<div className="category-thumbnail rounded-3xl relative md:flex md:justify-center bg-secondary-400 group-hover:bg-accent-500 duration-200 aspect-square w-[100px] h-[100px] md:w-[120px] md:h-[120px]">
								<img src={MousepadCategory} alt="" className='w-20 md:w-full scale-150 absolute top-4 skew-y-12 -skew-x-12 group-hover:scale-[1.6] group-hover:rotate-2 duration-200 ease-in-out' />
							</div>
							<p className='font-medium'>Mousepad</p>
						</button>
					</div>
				</div>
			</section>
		</>
	)
}

export default GearCategories