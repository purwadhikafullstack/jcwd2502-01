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
					password:
						"$2b$10$Tqg5AajUhh9mBmWr0Ik7eOg2gAzU3r6Dalmo1sHGlxHWt61PoHfnO",
					birth_date: null,
					gender: null,
					phone: null,
					role: "user",
					status: "verified",
				},
				{
					id: 2,
					username: "adidu",
					email: "adidu@gmail.com",
					password:
						"$2b$10$A889twpbSM4/aLgWuRlkXOjby3.G0wsQRhjzw4LulfPCgWx22TN32",
					birth_date: null,
					gender: null,
					phone: null,
					role: "admin",
					status: "verified",
				},
				{
					id: 3,
					username: "rafael",
					email: "rafael@gmail.com",
					password:
						"$2b$10$x1URhTbSNJk1DHk.fUzNeecIewi3vhfkwdjFH8zQL/pFJRNx0nAxa",
					birth_date: null,
					gender: null,
					phone: null,
					role: "admin",
					status: "verified",
				},
				{
					id: 4,
					username: "albert",
					email: "albert@gmail.com",
					password:
						"$2b$10$/kW7aDmE2BlhG3IZ6K8RCetwYKlNHg/QLkdGut7uDfdKWtbGENTQa",
					birth_date: null,
					gender: null,
					phone: null,
					role: "admin",
					status: "verified",
				},
				{
					id: 5,
					username: "admin",
					email: "admin@gmail.com",
					password:
						"$2b$10$/kW7aDmE2BlhG3IZ6K8RCetwYKlNHg/QLkdGut7uDfdKWtbGENTQa",
					birth_date: null,
					gender: null,
					phone: null,
					role: "super",
					status: "verified",
				},
				{
					id: 6,
					username: "adudaa",
					email: "noobman514@gmail.com",
					password:
						"$2b$10$/kW7aDmE2BlhG3IZ6K8RCetwYKlNHg/QLkdGut7uDfdKWtbGENTQa",
					birth_date: null,
					gender: null,
					phone: null,
					role: "user",
					status: "unverified",
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("users", null, {});
	},
};
