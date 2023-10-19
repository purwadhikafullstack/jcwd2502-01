'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('categories', [
			{
				"id": 1,
				"category_type": "Mouse"
			},
			{
				"id": 2,
				"category_type": "Keyboard"
			},
			{
				"id": 3,
				"category_type": "Controller"
			},
			{
				"id": 4,
				"category_type": "Headset"
			},
			{
				"id": 5,
				"category_type": "Monitor"
			},
			{
				"id": 6,
				"category_type": "Mousepad"
			}], {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('categories', null, {});
	}
};
