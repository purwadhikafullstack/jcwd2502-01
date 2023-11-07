const respHandler = require("../utils/respHandler");
const db = require("./../models");
const {
	findAllBrands,
	findAllBrandsWithProducts,
	createBrand,
	removeBrand,
	editBrand,
} = require("./../services/brandsService");

module.exports = {
	getAllBrands: async (req, res, next) => {
		try {
			const result = await findAllBrands();
			respHandler(res, result.message, result.data);
		} catch (error) {
			next(error);
		}
	},
	getAllBrandsWithProducts: async (req, res, next) => {
		try {
			const result = await findAllBrandsWithProducts();
			respHandler(res, result.message, result.data);
		} catch (error) {
			next(error);
		}
	},
	addBrand: async (req, res, next) => {
		try {
			const { brand_name } = req.body;

			const result = await createBrand(brand_name);
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
	deleteBrand: async (req, res, next) => {
		try {
			const { id } = req.params;

			const result = await removeBrand(id);

			respHandler(res, result.message, result.data);
		} catch (error) {
			next(error);
		}
	},
	updateBrand: async (req, res, next) => {
		try {
			const { id } = req.params;
			const { brand_name } = req.body;
			const result = await editBrand(id, brand_name);

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
