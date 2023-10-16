import React from 'react'
import { Chip } from '@nextui-org/react'

const ProductCard = () => {
	return (
		<>
			<div className="product-card bg-background p-3 pb-4 rounded-[20px] flex flex-col items-start border-1 border-neutral-200 dark:border-neutral-800">
				<div className="image-wrapper aspect-square w-full h-full">
					<div className="image w-full h-full bg-primary-500 rounded-xl" />
				</div>
				<div className="product-content flex flex-col p-2">
					<span className="product-title text-body-md">Logitech G102 Lightsync</span>
					<div className="frame-8 flex gap-2 my-2">
						<Chip className="frame-7 px-2" size='sm'>
							<p className="text-xs">Logitech</p>
						</Chip>
						<Chip className="frame-8 px-2" size='sm'>
							<p className="text-xs">Mouse</p>
						</Chip>
					</div>
					<p className="price text-price-sm font-medium">Rp. 350.000</p>
					<p className="location text-body-sm font-light">Tangerang Selatan</p>
				</div>
			</div>
		</>
	)
}

export default ProductCard