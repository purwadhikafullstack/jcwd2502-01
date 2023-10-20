"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"order_details",
			[
				{
					id: 1,
					order_id: 1,
					product_id: 1,
					quantity: 2,
					checked_out_price: 2399000,
				},
				{
					id: 2,
					order_id: 1,
					product_id: 2,
					quantity: 1,
					checked_out_price: 309000,
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("order_details", null, {});
	},
};
