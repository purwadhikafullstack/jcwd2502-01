const respHandler = require("../utils/respHandler");
const db = require("./../models");
const { getDataOrders } = require("./../services/reportsService");
module.exports = {
	getallOrders: async (req, res, next) => {
		try {
			const result = await getDataOrders(
				req.query,
				req.idWarehouse,
				req.role
			);
			respHandler(
				res,
				result.message,
				result.data ? result.data : null,
				null,
				result.isError
			);
		} catch (error) {
			next(error);
		}
	},
};
