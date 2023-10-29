const db = require("./../models");

const respHandler = require("../utils/respHandler");

module.exports = {
	getCities: async (req, res, next) => {
		try {
			const { province_id } = req.params;

			const cities = await db.city.findAll({ where: { province_id } });

			respHandler(res, "Get cities success", cities);
		} catch (error) {
			console.log(error);
		}
	},
};
