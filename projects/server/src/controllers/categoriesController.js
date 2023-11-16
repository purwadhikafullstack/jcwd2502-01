const respHandler = require("../utils/respHandler");
const db = require("./../models");
const {
	findAllCategories,
	createCategory,
	removeCategory,
	editCategory,
	findAllCategoriesWithProducts,
} = require("./../services/categoriesService");

module.exports = {
	getAllCategories: async (req, res, next) => {
		try {
			const result = await findAllCategories();
			respHandler(res, result.message, result.data);
		} catch (error) {
			next(error);
		}
	},
	getAllCategoriesWithProducts: async (req, res, next) => {
		try {
			const result = await findAllCategoriesWithProducts();
			respHandler(res, result.message, result.data);
		} catch (error) {
			next(error);
		}
	},
	addCategory: async (req, res, next) => {
		try {
			const { category_type } = req.body;

			const result = await createCategory(category_type);
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
	deleteCategory: async (req, res, next) => {
		try {
			const { categoryId } = req.params;

			const result = await removeCategory(categoryId);

			respHandler(res, result.message, result.data);
		} catch (error) {
			next(error);
		}
	},
	updateCategory: async (req, res, next) => {
		try {
			const { categoryId } = req.params;
			const { category_type } = req.body;
			const result = await editCategory(categoryId, category_type);

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
