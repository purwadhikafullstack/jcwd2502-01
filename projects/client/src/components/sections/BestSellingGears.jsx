import React from 'react'

import SwiperBestSellingGears from '../layouts/SwiperBestSellingGears'

const BestSellingGears = () => {
	return (
		<>
			<section className="top-deals my-container-mobile rounded-[20px] relative">
				<h2 className='font-bold text-headline-sm mb-4'>Best Selling Gears!</h2>
				<SwiperBestSellingGears />
			</section >
		</>
	)
}

export default BestSellingGears