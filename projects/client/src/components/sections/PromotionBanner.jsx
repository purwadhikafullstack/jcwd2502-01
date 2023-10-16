import React from 'react'

import SwiperPromotionBanner from '../layouts/SwiperPromotionBanner'

const PromotionBanner = () => {
	return (
		<>
			<section className="home-banner my-container flex">
				<div className='my-container flex gap-4 py-6'>
					<SwiperPromotionBanner className={"col-span-6"} />
					<div className='min-w-[400px] min-h-[400px] rounded-[20px] bg-accent-500'></div>
				</div>
			</section>
		</>
	)
}

export default PromotionBanner