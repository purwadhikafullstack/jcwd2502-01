import React from "react";

import NotFound from "../../assets/illustrations/404.png";

const NotFoundPage = () => {
	return (
		<>
			<main className="h-screen py-12 flex flex-col items-center">
				<img src={NotFound} alt="" className="w-52 md:w-64 my-12" />
				<h1 className="font-bold text-center text-4xl md:text-6xl">
					Page Not Found
				</h1>
			</main>
		</>
	);
};

export default NotFoundPage;
