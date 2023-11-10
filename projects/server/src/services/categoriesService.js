const db = require("./../models");
const Sequelize = require("sequelize");

module.exports = {
	findAllCategories: async () => {
		try {
			const dataAllCategories = await db.category.findAll({
				attributes: ["id", "category_type"],
			});

			// const dataCategoriesWithProducts = await db.category.findAll({
			// 	attributes: ["id", "category_type"],
			// 	include: [
			// 		{
			// 			model: db.product,
			// 			attributes: [
			// 				[
			// 					Sequelize.fn(
			// 						"COUNT",
			// 						Sequelize.col("product_name")
			// 					),
			// 					"total_products",
			// 				],
			// 			],
			// 		},
			// 	],
			// 	order: [["updatedAt", "DESC"]],
			// 	group: ["category.id"],
			// });

			return {
				message: "Get categories success",
				data: dataAllCategories,
			};
		} catch (error) {
			return error;
		}
	},
	findAllCategoriesWithProducts: async () => {
		try {
			const dataCategoriesWithProducts = await db.category.findAll({
				attributes: ["id", "category_type"],
				include: [
					{
						model: db.product,
						attributes: [
							[
								Sequelize.fn(
									"COUNT",
									Sequelize.col("product_name")
								),
								"total_products",
							],
						],
					},
				],
				order: [["updatedAt", "DESC"]],
				group: ["category.id"],
			});

			return {
				message: "Get categories success",
				data: dataCategoriesWithProducts,
			};
		} catch (error) {
			return error;
		}
	},
	createCategory: async (categoryType) => {
		try {
			if (!categoryType) {
				return {
					isError: true,
					message: `Data is not complete`,
					data: null,
				};
			}
			const checkCategory = await db.category.findOne({
				where: { category_type: categoryType },
			});
			if (checkCategory) {
				return {
					isError: true,
					message: `${categoryType} category is already added`,
					data: null,
				};
			}
			const addCategory = await db.category.create({
				category_type: categoryType,
			});
			return {
				message: "Add category success",
			};
		} catch (error) {
			return error;
		}
	},
	removeCategory: async (categoryId) => {
		try {
			const checkCategory = await db.category.findByPk(categoryId);
			if (!checkCategory) {
				return { message: "Category not found", data: null };
			}
			await db.category.destroy({
				where: { id: categoryId },
			});

			return { message: "Delete category success", data: null };
		} catch (error) {
			return error;
		}
	},
	editCategory: async (categoryId, categoryType) => {
		try {
			if (!categoryType) {
				return {
					isError: true,
					message: `Data is not complete`,
					data: null,
				};
			}
			const checkCategory = await db.category.findByPk(categoryId);
			if (!checkCategory) {
				return { message: "Category not found", data: null };
			}
			const checkCategory2 = await db.category.findOne({
				where: { category_type: categoryType },
			});
			if (checkCategory2) {
				return {
					isError: true,
					message: `${categoryType} category is already added`,
					data: null,
				};
			}
			const updateCategory = await db.category.update(
				{ category_type: categoryType },
				{ where: { id: categoryId } }
			);
			return { message: "Update category success", data: null };
		} catch (error) {
			return error;
		}
	},
};
