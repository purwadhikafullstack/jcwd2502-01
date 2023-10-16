import React from 'react'

import SwiperPromotionBanner from '../layouts/SwiperPromotionBanner'

const PromotionBanner = () => {
	return (
		<>
			<section className="home-banner">
				<div className=' flex gap-4'>
					<SwiperPromotionBanner />
					<div className='hidden min-w-[400px] min-h-[400px] rounded-[20px] bg-accent-500'></div>
				</div>
			</section>
		</>
	)
}

export default PromotionBanner