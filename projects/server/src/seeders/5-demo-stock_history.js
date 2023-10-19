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
					change: -10,
					final_stock: 10,
					date: "2023-10-18",
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
