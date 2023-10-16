'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('brands', [
	{
      "id": 1,
      "brand_name": "Logitech"
    },
    {
      "id": 2,
      "brand_name": "Razer"
    },
    {
      "id": 3,
      "brand_name": "Steelseries"
    },
    {
      "id": 4,
      "brand_name": "Corsair"
    },
    {
      "id": 5,
      "brand_name": "Fantech"
    },
    {
      "id": 6,
      "brand_name": "AOC"
    }
	], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('brands', null, {});
  }
};
