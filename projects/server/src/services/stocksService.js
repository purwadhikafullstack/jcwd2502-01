const db = require("./../models");
const { Op } = require("sequelize");
const { sequelize } = require("./../models");
const fs = require("fs");

module.exports = {
	findAllProductsStocks: async (query) => {
		try {
			const {
				warehouse,
				search,
				category,
				brand,
				orderField,
				orderDirection,
				offset,
			} = query;

			if (!warehouse) {
				return {
					isError: true,
					message: `Please select warehouse`,
					data: null,
				};
			}

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
					{
						model: db.stock,
						attributes: ["stocks", "id"],
						where: { warehouse_id: warehouse },
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

			// const dataAllProducts = await db.product.findAll(baseQuery);
			const count = await db.product.count(baseQuery);
			const dataAllProductsStocks = await db.product.findAll(baseQuery);

			console.log(dataAllProductsStocks);

			return {
				message: "Get products stocks data success",
				data: { count, products: dataAllProductsStocks },
			};
		} catch (error) {
			return error;
		}
	},
	findOneStock: async (stockId) => {
		try {
			const dataStock = await db.stock.findOne({
				attributes: ["stocks"],
				include: [
					{
						model: db.warehouse,
						attributes: ["warehouse_name"],
					},
					{
						model: db.product,
						attributes: ["product_name"],
					},
				],
				where: { id: stockId },
			});
			if (!dataStock) {
				return {
					isError: true,
					message: `Stock not found`,
					data: null,
				};
			}
			return { message: "Get stock data success", data: dataStock };
		} catch (error) {
			return error;
		}
	},
	editStock: async (stockId, newStocks) => {
		try {
			if (newStocks < 0) {
				return {
					isError: true,
					message: `Stock can not be less than 0`,
					data: null,
				};
			}
			const checkStock = await db.stock.findByPk(stockId);
			if (!checkStock) {
				return {
					isError: true,
					message: `Stock not found`,
					data: null,
				};
			}

			const updateStock = await db.stock.update(
				{ stocks: newStocks },
				{ where: { id: stockId } }
			);
			return { message: "Update stock data success", data: null };
		} catch (error) {
			return error;
		}
	},
};
