const db = require("./../models");

const respHandler = require("../utils/respHandler");
const {
	findAllProductsStocks,
	findOneStock,
	editStock,
	findStockHistories,
	findIncomingMutation,
	findOutgoingMutation,
	addMutation,
	updateMutationStatus,
	findSpecificStock,
} = require("../services/stocksService");

module.exports = {
	getAllProductsStocks: async (req, res, next) => {
		try {
			const result = await findAllProductsStocks(req.query);
			respHandler(
				res,
				result.message,
				result.data,
				result.status,
				result.isError
			);
		} catch (error) {
			next(error);
		}
	},
	getOneStock: async (req, res, next) => {
		try {
			const { stockId } = req.params;
			const result = await findOneStock(stockId);
			respHandler(
				res,
				result.message,
				result.data,
				result.status,
				result.isError
			);
		} catch (error) {
			next(error);
		}
	},
	getSpecificStock: async (req, res, next) => {
		try {
			const { productId, warehouseId } = req.query;
			const result = await findSpecificStock(productId, warehouseId);
			respHandler(
				res,
				result.message,
				result.data,
				result.status,
				result.isError
			);
		} catch (error) {
			next(error);
		}
	},
	updateStock: async (req, res, next) => {
		try {
			const { stockId } = req.params;
			const { stocks } = req.body;
			const result = await editStock(stockId, stocks);
			respHandler(
				res,
				result.message,
				result.data,
				result.status,
				result.isError
			);
		} catch (error) {
			next(error);
		}
	},
	getStockHistories: async (req, res, next) => {
		try {
			// const { warehouseId } = req.query;
			const result = await findStockHistories(
				req.query,
				req.idWarehouse,
				req.role
			);
			respHandler(
				res,
				result.message,
				result.data,
				result.status,
				result.isError
			);
		} catch (error) {
			next(error);
		}
	},
	getIncomingMutation: async (req, res, next) => {
		try {
			const result = await findIncomingMutation(req.query);
			respHandler(
				res,
				result.message,
				result.data,
				result.status,
				result.isError
			);
		} catch (error) {
			next(error);
		}
	},
	getOutgoingMutation: async (req, res, next) => {
		try {
			const result = await findOutgoingMutation(req.query);
			respHandler(
				res,
				result.message,
				result.data,
				result.status,
				result.isError
			);
		} catch (error) {
			next(error);
		}
	},
	createMutation: async (req, res, next) => {
		try {
			const data = req.body;
			const result = await addMutation(data);
			respHandler(
				res,
				result.message,
				result.data,
				result.status,
				result.isError
			);
		} catch (error) {
			next(error);
		}
	},
	updateMutation: async (req, res, next) => {
		try {
			const { mutationId } = req.params;
			const { status } = req.body;
			const result = await updateMutationStatus(mutationId, status);
			respHandler(
				res,
				result.message,
				result.data,
				result.status,
				result.isError
			);
		} catch (error) {
			next(error);
		}
	},
};
