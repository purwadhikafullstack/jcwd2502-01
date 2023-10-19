"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"user_addresses",
			[
				{
					id: 1,
					address_name: "Rumah",
					user_id: 1,
					address: "Jalan something",
					city: "Jakarta",
					province: "Jawa Barat",
					address_location: "coordinate",
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("user_addresses", null, {});
	},
};
