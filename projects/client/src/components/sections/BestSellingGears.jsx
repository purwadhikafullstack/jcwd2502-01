import React from 'react'

import SwiperTopDeals from '../layouts/SwiperTopDeals'

const BestSellingGears = () => {
	return (
		<>
			<section className="top-deals px-8 py-6 my-container bg-neutral-50 dark:bg-neutral-900 rounded-[20px] relative">
				<h2 className='font-bold text-headline-sm mb-4'>Best Selling Gears!</h2>
				<SwiperTopDeals />
			</section >
		</>
	)
}

export default BestSellingGears