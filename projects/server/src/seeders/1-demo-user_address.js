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
					address: "Jalan Menceng No. 9",
					province_id: "6",
					city_id: "151",
					latitude: "-6.161569",
					longitude: "106.7438905",
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("user_addresses", null, {});
	},
};
