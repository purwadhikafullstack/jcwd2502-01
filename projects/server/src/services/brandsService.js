const db = require("./../models");

module.exports = {
	findAllBrands: async () => {
		try {
			const dataAllBrands = await db.brand.findAll({
				attributes: ["id", "brand_name"],
			});
			return dataAllBrands;
		} catch (error) {
			return error;
		}
	},
};
