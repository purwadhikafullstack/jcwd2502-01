import { useSwiper } from "swiper/react"
import { PiCaretLeftBold } from "react-icons/pi"

const MySwiperButtonPrev = () => {
	const swiper = useSwiper()

	return (
		<>
			<button
				className={`my-swiper-button-next hidden bg-white/20 hover:bg-white/40 dark:bg-neutral-800/20 dark:hover:bg-neutral-800/40 rounded-full w-10 h-10 absolute top-[45%] left-4 z-10 duration-100 justify-center items-center flex`}
				onClick={() => swiper.slidePrev()}
			>
				<PiCaretLeftBold fill="white" size={20} />
			</button>
		</>
	)
}

export default MySwiperButtonPrev