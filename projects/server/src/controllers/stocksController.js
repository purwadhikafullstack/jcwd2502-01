const db = require("./../models");

const respHandler = require("../utils/respHandler");
const {
	findAllProductsStocks,
	findOneStock,
	editStock,
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
	updateStock: async (req, res, next) => {
		try {
			console.log(">>>> body >>>>>", req.body.stocks);
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
	// createProduct: async (req, res, next) => {
	// 	try {
	// 		const images = req.files.images;
	// 		console.log("images", images);
	// 		const dataProduct = JSON.parse(req.body.dataProduct);
	// 		const dataSpec = JSON.parse(req.body.dataSpec);
	// 		const result = await addProduct(images, dataProduct, dataSpec);
	// 		respHandler(
	// 			res,
	// 			result.message,
	// 			result.data,
	// 			result.status,
	// 			result.isError
	// 		);
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// },
	// updateProduct: async (req, res, next) => {
	// 	try {
	// 		const { productId } = req.params;
	// 		const images = req.files.images;
	// 		console.log("images", images);
	// 		const dataImages = JSON.parse(req.body.dataImages);
	// 		const dataProduct = JSON.parse(req.body.dataProduct);
	// 		const dataSpec = JSON.parse(req.body.dataSpec);
	// 		// console.log(
	// 		// 	"masuk",
	// 		// 	productId,
	// 		// 	images,
	// 		// 	dataImages,
	// 		// 	dataProduct,
	// 		// 	dataSpec
	// 		// );
	// 		const result = await editProduct(
	// 			productId,
	// 			images,
	// 			dataImages,
	// 			dataProduct,
	// 			dataSpec
	// 		);
	// 		respHandler(
	// 			res,
	// 			result.message,
	// 			result.data,
	// 			result.status,
	// 			result.isError
	// 		);
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// },
	// deleteProduct: async (req, res, next) => {
	// 	try {
	// 		const { productId } = req.params;

	// 		const result = await removeProduct(productId);
	// 		respHandler(
	// 			res,
	// 			result.message,
	// 			result.data,
	// 			result.status,
	// 			result.isError
	// 		);
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// },
};
