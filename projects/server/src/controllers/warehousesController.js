const { deleteFiles } = require("../helper/deleteFiles");
const db = require("./../models");

const {
	findAllWarehouses,
	addWarehouse,
	updateWarehouse,
	removeWarehouse,
	findWarehouse,
	findOtherWarehouses,
	findWarehouseList,
	getUnassignedWarehouse,
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
	getWarehouseList: async (req, res, next) => {
		try {
			const result = await findWarehouseList(req.query);
			respHandler(res, result.message, result.data);
		} catch (error) {
			next(error);
		}
	},
	getOtherWarehouses: async (req, res, next) => {
		try {
			const { warehouseId } = req.params;
			const result = await findOtherWarehouses(warehouseId);
			respHandler(res, result.message, result.data);
		} catch (error) {
			next(error);
		}
	},
	getWarehouse: async (req, res, next) => {
		try {
			const { warehouseId } = req.params;
			const result = await findWarehouse(warehouseId);
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
			const { warehouseId } = req.params;
			const result = await updateWarehouse(warehouseId, req.body);
			respHandler(res, result.message, result.data);
		} catch (error) {
			next(error);
		}
	},
	deleteWarehouse: async (req, res, next) => {
		try {
			const { warehouseId } = req.params;
			const result = await removeWarehouse(warehouseId);
			respHandler(res, result.message, result.data);
		} catch (error) {
			next(error);
		}
	},
	fetchUnassignedWarehouse: async (req, res, next) => {
		try {
			console.log(req.query.id);
			const result = await getUnassignedWarehouse(req.query);
			respHandler(res, result.message, result.data);
		} catch (error) {
			next(error);
		}
	},
};
