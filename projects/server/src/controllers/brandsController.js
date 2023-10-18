const respHandler = require("../utils/respHandler");
const db = require("./../models");
const { findAllBrands } = require("./../services/brandsService");

module.exports = {
	getAllBrand: async (req, res, next) => {
		try {
			const data = await findAllBrands();
			respHandler(res, "Get Brands success", data);
		} catch (error) {
			next(error);
		}
	},
};
