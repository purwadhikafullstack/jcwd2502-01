"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"users",
			[
				{
					id: 1,
					username: "andrean",
					email: "andrean923@gmail.com",
					password:
						"$2b$10$Tqg5AajUhh9mBmWr0Ik7eOg2gAzU3r6Dalmo1sHGlxHWt61PoHfnO",
					role: "user",
					status: "verified",
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("users", null, {});
	},
};
