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
					change: "subtraction",
					quantity_change: 90,
					type: "manual",
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("stock_histories", null, {});
	},
};
