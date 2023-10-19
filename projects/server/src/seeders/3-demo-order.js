"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"orders",
			[
				{
					id: 1,
					user_id: 1,
					address_id: 1,
					warehouse_id: 1,
					total_amount: 2708000,
					total_item: 3,
					proof_of_payment: "image",
					status: "completed",
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("orders", null, {});
	},
};
