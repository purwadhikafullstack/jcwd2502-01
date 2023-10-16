'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('specifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER
      },
      height: {
        type: Sequelize.STRING
      },
      width: {
        type: Sequelize.STRING
      },
      thickness: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      wireless: {
        type: Sequelize.BOOLEAN
      },
      wired: {
        type: Sequelize.STRING
      },
      battery_life: {
        type: Sequelize.STRING
      },
      warranty: {
        type: Sequelize.STRING
      },
      sensor: {
        type: Sequelize.STRING
      },
      resolution: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('specifications');
  }
};