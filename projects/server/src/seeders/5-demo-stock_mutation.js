"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"stock_mutations",
			[
				{
					id: 1,
					product_id: 1,
					quantity: 1,
					user_id_to: 3,
					warehouse_id_to: 2,
					user_id_from: 2,
					warehouse_id_from: 1,
					status: "pending",
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("stock_mutations", null, {});
	},
};
