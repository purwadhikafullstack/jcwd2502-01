import { useSwiper } from "swiper/react";
import { PiCaretRightBold } from "react-icons/pi";

const MySwiperButtonNext = () => {
	const swiper = useSwiper();

	return (
		<button
			className={`my-swiper-button-next hidden bg-neutral-300/50 hover:bg-neutral-300/40 dark:bg-neutral-500/20 dark:hover:bg-neutral-500/40 rounded-full w-10 h-10 absolute top-[45%] right-4 z-10 duration-100 justify-center items-center md:flex`}
			onClick={() => swiper.slideNext()}
		>
			<PiCaretRightBold
				className="fill-black dark:fill-white"
				size={20}
			/>
		</button>
	);
};

export default MySwiperButtonNext;
