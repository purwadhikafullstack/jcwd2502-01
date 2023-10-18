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
					password: "abc123",
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
