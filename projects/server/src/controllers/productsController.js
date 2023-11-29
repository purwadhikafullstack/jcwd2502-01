const { deleteFiles } = require("../helper/deleteFiles");
const db = require("./../models");

const {
	findAllProducts,
	findOneProduct,
	addProduct,
	editProduct,
	removeProduct,
	topSoldProducts,
} = require("./../services/productsService");

const respHandler = require("../utils/respHandler");

module.exports = {
	getAllProducts: async (req, res, next) => {
		try {
			const result = await findAllProducts(req.query);
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
	getProduct: async (req, res, next) => {
		try {
			let { productName } = req.params;
			const decodedProductName = decodeURIComponent(productName);
			const result = await findOneProduct(decodedProductName);
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
	createProduct: async (req, res, next) => {
		try {
			const images = req.files.images;
			const dataProduct = JSON.parse(req.body.dataProduct);
			const dataSpec = JSON.parse(req.body.dataSpec);
			const result = await addProduct(images, dataProduct, dataSpec);
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
	updateProduct: async (req, res, next) => {
		try {
			const { productId } = req.params;
			const images = req.files.images;
			const dataImages = JSON.parse(req.body.dataImages);
			const dataProduct = JSON.parse(req.body.dataProduct);
			const dataSpec = JSON.parse(req.body.dataSpec);
			const result = await editProduct(
				productId,
				images,
				dataImages,
				dataProduct,
				dataSpec
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
	deleteProduct: async (req, res, next) => {
		try {
			const { productId } = req.params;

			const result = await removeProduct(productId);
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
	getTopSoldProduct: async (req, res, next) => {
		try {
			const result = await topSoldProducts();

			respHandler(res, result.message, result.data);
		} catch (error) {
			next(error);
		}
	},
};
