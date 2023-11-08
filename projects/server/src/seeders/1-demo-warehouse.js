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
					latitude: "-6.9215529",
					longitude: "107.6110212",
					warehouse_address: "jl.jalan something 1",
					province_id: "9",
					city_id: "23",
				},
				{
					id: 2,
					warehouse_name: "Tangerang",
					latitude: "-6.3227016",
					longitude: "106.7085737",
					warehouse_address: "jl.jalan something 1",
					province_id: "3",
					city_id: "457",
				},
				{
					id: 3,
					warehouse_name: "Jakarta",
					latitude: "-6.161569",
					longitude: "106.7438905",
					warehouse_address: "jl.jalan something 1",
					province_id: "6",
					city_id: "151",
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("warehouses", null, {});
	},
};
