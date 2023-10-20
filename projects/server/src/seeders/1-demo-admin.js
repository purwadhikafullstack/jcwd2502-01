"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"admin",
			[
				{
					user_id: 2,
					warehouse_id: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					user_id: 3,
					warehouse_id: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					user_id: 4,
					warehouse_id: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		queryInterface.bulkDelete("admin", null, {});
	},
};
