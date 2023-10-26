const { deleteFiles } = require("../helper/deleteFiles");
const db = require("./../models");

const {
	findAllWarehouses,
	addWarehouse,
	updateWarehouse,
	removeWarehouse,
} = require("./../services/warehousesService");

const respHandler = require("../utils/respHandler");

module.exports = {
	getAllWarehouses: async (req, res, next) => {
		try {
			const { productId } = req.params;
			const data = await findAllWarehouses(productId);
			respHandler(res, "Get product's data success", data);
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
			const { warehouseId } = req.params;
			const result = await updateWarehouse(warehouseId, req.body);
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
