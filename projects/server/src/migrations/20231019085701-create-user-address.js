"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("user_addresses", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			address_name: {
				type: Sequelize.STRING,
			},
			address: {
				type: Sequelize.STRING,
			},
			recipient_name: {
				type: Sequelize.STRING,
			},
			is_default: {
				type: Sequelize.BOOLEAN,
			},
			address_location: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("user_addresses");
	},
};
