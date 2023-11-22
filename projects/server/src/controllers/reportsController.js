const respHandler = require("../utils/respHandler");
const db = require("./../models");
const {
	getDataOrders,
	getDataTransaction,
	getDataOrderByCatergory,
	getDataOrderByBrand,
} = require("./../services/reportsService");
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
	getTransaction: async (req, res, next) => {
		try {
			const result = await getDataTransaction(
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
	getDataTransactionByCategory: async (req, res, next) => {
		try {
			const result = await getDataOrderByCatergory(
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
	getDataTransactionByBrand: async (req, res, next) => {
		try {
			const result = await getDataOrderByBrand(
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
