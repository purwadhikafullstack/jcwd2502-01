"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"carts",
			[
				{
					id: 1,
					quantity: 5,
					status: false,
					user_id: 1,
					product_id: 1,
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("carts", null, {});
	},
};
