"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"user_addresses",
			[
				{
					id: 1,
					address_name: "rumah",
					is_default: true,
					recipient_name: "andrean",
					user_id: 1,
					address: "Jalan something",
					province_id: "6",
					city_id: "151",
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
