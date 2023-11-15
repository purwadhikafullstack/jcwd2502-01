"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"stock_histories",
			[
				{
					id: 1,
					stock_id: 1,
					stock_before: 100,
					change: "-10",
					quantity_change: 90,
					type: "manual, mutation, transaksi",
					user_id: 2,
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("stock_histories", null, {});
	},
};
