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
					shipping_cost: 19000,
					receipt_number: 13213219,
					invoice: "INV/20231114/NXCMP/101183",
					total_amount: 5107000,
					total_item: 3,
					proof_of_payment: "image",
					status: "1",
					viewed: null,
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("orders", null, {});
	},
};
