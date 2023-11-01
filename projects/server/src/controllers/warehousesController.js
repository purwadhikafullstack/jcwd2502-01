const { deleteFiles } = require("../helper/deleteFiles");
const db = require("./../models");

const {
	findAllWarehouses,
	addWarehouse,
	updateWarehouse,
	removeWarehouse,
	findWarehouse,
} = require("./../services/warehousesService");

const respHandler = require("../utils/respHandler");

module.exports = {
	getAllWarehouses: async (req, res, next) => {
		try {
			const result = await findAllWarehouses();
			respHandler(res, result.message, result.data);
		} catch (error) {
			next(error);
		}
	},
	getWarehouse: async (req, res, next) => {
		try {
			const { id } = req.params;
			const result = await findWarehouse(id);
			respHandler(res, result.message, result.data);
		} catch (error) {
			next(error);
		}
	},
	createWarehouse: async (req, res, next) => {
		try {
			const { userId } = req.query;
			const result = await addWarehouse(req.body, userId);
			respHandler(res, result.message, result.data);
		} catch (error) {
			next(error);
		}
	},
	editWarehouse: async (req, res, next) => {
		try {
			const { id } = req.params;
			const result = await updateWarehouse(id, req.body);
			respHandler(res, result.message, result.data);
		} catch (error) {
			next(error);
		}
	},
	deleteWarehouse: async (req, res, next) => {
		try {
			const { id } = req.params;
			const result = await removeWarehouse(id);
			respHandler(res, result.message, result.data);
		} catch (error) {
			next(error);
		}
	},
};
