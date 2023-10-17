import React from 'react'
import ProductCard from '../uis/ProductCard/ProductCard'

const HomeProductFeeds = () => {
	return (
		<>
			<section className="home-product-feeds my-container-mobile">
				<div className='py-8'>
					<div className="section-title text-center mb-2">
						<h2 className='text-headline-sm font-bold'>Gear Up, Win the Game</h2>
						<p className='text-body-sm text-neutral-400'>We have a bunch of gear for you to win the game.</p>
					</div>
					<div className="grid-wrapper grid grid-cols-2 gap-2 py-4">
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
					</div>
				</div>
			</section>
		</>
	)
}

export default HomeProductFeeds