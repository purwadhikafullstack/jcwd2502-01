const db = require("./../models");

const respHandler = require("../utils/respHandler");

module.exports = {
	getUserAddresses: async (req, res, next) => {
		try {
			const { user_id } = req.params;
			const { address_id } = req.query;

			if (user_id && !address_id) {
				const user_addresses = await db.user_address.findAll({
					attributes: [
						"id",
						"address_name",
						"recipient_name",
						"address",
						"is_default",
					],
					include: [
						{
							model: db.province,
							attributes: ["id", "province"],
						},
						{
							model: db.city,
							attributes: ["type", "city_name", "postal_code"],
						},
					],
					where: { user_id },
				});

				respHandler(
					res,
					"Get all user addresses success",
					user_addresses
				);
			} else if (user_id && address_id) {
				const user_address = await db.user_address.findOne({
					attributes: [
						"id",
						"address_name",
						"recipient_name",
						"address",
						"is_default",
					],
					include: [
						{
							model: db.province,
							attributes: ["id", "province"],
						},
						{
							model: db.city,
							attributes: ["type", "city_name", "postal_code"],
						},
					],
					where: { user_id, id: address_id },
				});

				respHandler(
					res,
					"Get selected user address success",
					user_address
				);
			}
		} catch (error) {
			console.log(error);
		}
	},
};
