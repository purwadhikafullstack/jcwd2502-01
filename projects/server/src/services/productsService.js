const db = require("./../models");
const { Op } = require("sequelize");
const { sequelize } = require("./../models");

module.exports = {
	findAllProducts: async (query) => {
		try {
			const {
				search,
				category,
				brand,
				orderField,
				orderDirection,
				offset,
			} = query;

			const selectedAttributes = [
				"id",
				"product_name",
				"product_desc",
				"product_price",
			];

			const categoryInclude = {
				model: db.category,
				attributes: ["category_type", "id"],
			};

			const brandInclude = {
				model: db.brand,
				attributes: ["brand_name", "id"],
			};

			if (category) {
				const arrayCategory = category.split("");
				categoryInclude.where = {
					id: {
						[Op.in]: arrayCategory,
					},
				};
			}

			if (brand) {
				const arrayBrand = brand.split("");
				brandInclude.where = {
					id: {
						[Op.in]: arrayBrand,
					},
				};
			}

			const orderOptions = [];

			if (orderField && orderDirection) {
				orderOptions.push([orderField, orderDirection]);
			}

			const baseQuery = {
				attributes: selectedAttributes,
				include: [
					{
						model: db.product_image,
						attributes: ["image", "id"],
						limit: 1,
					},
					categoryInclude,
					brandInclude,
				],
				limit: 12,
				order: orderOptions,
			};

			if (search) {
				baseQuery.where = {
					product_name: {
						[Op.like]: `%${search}%`,
					},
				};
			}

			if (offset) {
				baseQuery.offset = Number(offset);
			}

			const dataAllProducts = await db.product.findAll(baseQuery);
			const count = await db.product.count(baseQuery);

			return {
				message: "Get products data success",
				data: { count, products: dataAllProducts },
			};
		} catch (error) {
			return error;
		}
	},
	findOneProduct: async (productName) => {
		try {
			const dataProduct = await db.product.findOne({
				attributes: [
					"id",
					"product_name",
					"product_desc",
					"product_price",
				],
				include: [
					{
						model: db.product_image,
						attributes: ["image", "id"],
					},
					{
						model: db.category,
						attributes: ["category_type", "id"],
					},
					{
						model: db.brand,
						attributes: ["brand_name", "id"],
					},
					{
						model: db.stock,
						attributes: ["stocks", "id", "warehouse_id"],
					},
					{
						model: db.specification,
						attributes: {
							exclude: [
								"createdAt",
								"updatedAt",
								"deletedAt",
								"product_id",
							],
						},
					},
				],
				where: { product_name: productName },
			});
			if (!dataProduct) {
				return { isError: true, message: "Product not found" };
			}
			return { message: "Get product's data success", data: dataProduct };
		} catch (error) {
			return error;
		}
	},
	removeProduct: async (productName) => {
		try {
			const dataProduct = await db.product.findOne({
				where: { product_name: productName },
			});
			if (!dataProduct) {
				return { isError: true, message: "Product not found" };
			}
			await db.product.destroy({
				where: { product_name: productName },
			});
			return { message: "Get product's data success", data: dataProduct };
		} catch (error) {
			return error;
		}
	},
};
