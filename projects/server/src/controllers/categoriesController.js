const respHandler = require("../utils/respHandler");
const db = require("./../models");
const { findAllCategories } = require("./../services/categoriesService");

module.exports = {
	getAllCategories: async (req, res, next) => {
		try {
			const data = await findAllCategories();
			respHandler(res, "Get categories success", data);
		} catch (error) {
			next(error);
		}
	},
	addCategory: async (req, res, next) => {
		try {
			const { category_name } = req.body;

			const addCategory = await db.category.create({ category_name });

			res.status(201).send({
				isError: false,
				message: "Delete data success",
				data: addCategory,
			});
		} catch (error) {
			next(error);
		}
	},
	deleteCategory: async (req, res, next) => {
		try {
			const { categoryId } = req.params;

			console.log(categoryId);

			const deleteCategory = await db.category.destroy({
				where: { id: categoryId },
			});

			res.status(201).send({
				isError: false,
				message: "Delete data success",
				data: deleteCategory,
			});
		} catch (error) {
			next(error);
		}
	},
	updateCategory: async (req, res, next) => {
		try {
			const { categoryId } = req.params;
			const { category_name } = req.body;

			const updateCategory = await db.category.update(
				{ category_name },
				{ where: { id: categoryId } }
			);

			res.status(201).send({
				isError: false,
				message: "Update category name success",
				data: updateCategory,
			});
		} catch (error) {
			next(error);
		}
	},
};
