"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"warehouses",
			[
				{
					id: 1,
					warehouse_name: "Bandung",
					warehouse_location: "coordinate",
				},
				{
					id: 2,
					warehouse_name: "Tangerang",
					warehouse_location: "coordinate",
				},
				{
					id: 3,
					warehouse_name: "Jakarta",
					warehouse_location: "coordinate",
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("warehouses", null, {});
	},
};
