const db = require("./../models");
const Sequelize = require("sequelize");

module.exports = {
	findAllCategories: async () => {
		try {
			const dataAllCategories = await db.category.findAll({
				attributes: ["id", "category_type"],
				order: [["updatedAt", "DESC"]],
			});

			const orderedCategories = await db.category.findAll({
				attributes: ["id"],
				order: [["updatedAt", "DESC"]],
			});

			const categoryIds = orderedCategories.map(
				(category) => category.id
			);

			// const dataCategoriesWithProducts = await db.product.findAll({
			// 	attributes: [
			// 		[
			// 			Sequelize.fn("COUNT", Sequelize.col("product.id")),
			// 			"total_products",
			// 		],
			// 	],
			// 	include: [
			// 		{
			// 			model: db.category,
			// 			attributes: ["id", "category_type", "updatedAt"],
			// 			order: [["updatedAt", "DESC"]],
			// 		},
			// 	],
			// 	where: {
			// 		category_id: categoryIds,
			// 	},
			// 	group: ["category_type"],
			// });

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
			// const dataToSend = [];
			// for (const i in dataAllCategories) {
			// 	dataToSend.push({
			// 		id: dataAllCategories[i].id,
			// 		category_type: dataAllCategories[i].category_type,
			// 		total_product: dataCategoriesWithProducts[i].dataValues.products,
			// 	});
			// }
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
			return { message: "Add category success", data: addCategory };
		} catch (error) {
			next(error);
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
			next(error);
		}
	},
	editCategory: async (categoryId, categoryType) => {
		try {
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
			next(error);
		}
	},
};
