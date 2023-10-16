import { Switch } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

import { IoMoon, IoSunny } from "react-icons/io5"

const ThemeToggle = () => {
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
	);

	const handleToggle = (e) => {
		if (e.target.checked) {
			setTheme("dark")
		} else {
			setTheme("light")
		}
	}

	useEffect(() => {
		localStorage.setItem("theme", theme);
		const localTheme = localStorage.getItem("theme")
		document.querySelector("html").setAttribute("class", localTheme)
	}, [theme])

	return (
		<>
			<div className='fixed bottom-10 right-10 z-20'>
				<Switch
					size="lg"
					color="default"
					startContent={<IoMoon />}
					endContent={<IoSunny />}
					onChange={handleToggle}
					isSelected={theme === "dark" ? true : false}
				>
				</Switch>
			</div>
		</>
	)
}

export default ThemeToggle