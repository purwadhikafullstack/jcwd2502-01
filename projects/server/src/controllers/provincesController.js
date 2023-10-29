const db = require("./../models");

const respHandler = require("../utils/respHandler");

module.exports = {
	getProvinces: async (req, res, next) => {
		try {
			const provinces = await db.province.findAll();

			respHandler(res, "Get provinces success", provinces);
		} catch (error) {
			console.log(error);
		}
	},
};
