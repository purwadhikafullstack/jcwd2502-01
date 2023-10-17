import React from 'react'
import { Chip } from '@nextui-org/react'

const ProductCard = () => {
	return (
		<>
			<div className="product-card bg-background rounded-[20px] flex flex-col items-start border-1 border-neutral-200 hover:border-primary-500 dark:border-neutral-800 hover:dark:border-primary-500 hover:shadow-md hover:shadow-primary-200 duration-200">
				<div className="image-wrapper aspect-square w-full h-full">
					<div className="image w-full h-full bg-primary-500 rounded-t-[20px]" />
				</div>
				<div className="product-content flex flex-col p-2">
					<span className="product-title font-medium text-body-sm md:text-body-md">Logitech G102 Lightsync</span>
					<div className="frame-8 flex gap-2 my-2">
						<Chip className="chip md:px-2" size='sm'>
							<p className="text-[10px] md:text-xs">Logitech</p>
						</Chip>
						<Chip className="chip md:px-2" size='sm'>
							<p className="text-[10px] md:text-xs">Mouse</p>
						</Chip>
					</div>
					<p className="price text-price-xs md:text-price-sm font-bold">Rp. 350.000</p>
					<p className="location text-label-sm md:text-body-sm font-light">Tangerang Selatan</p>
				</div>
			</div>
		</>
	)
}

export default ProductCard