import React from "react";

const OrderListPage = () => {
	return (
		<main className="my-container min-h-screen py-4">
			<div className="page-heading mb-4">
				<h3 className="font-bold text-headline-sm">
					Transaction History
				</h3>
			</div>
			<div className="order-list">
				<div className="order-card"></div>
			</div>
		</main>
	);
};

export default OrderListPage;
