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
				const arrayCategory = category.split(",");
				categoryInclude.where = {
					id: {
						[Op.in]: arrayCategory,
					},
				};
			}

			if (brand) {
				const arrayBrand = brand.split(",");
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
					// {
					// 	model: db.stock,
					// 	attributes: ["stocks", "id"],
					// 	where: { warehouse_id: warehouse },
					// },
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

			const dataProducts = await db.product.findAll(baseQuery);
			const count = await db.product.count({
				where: baseQuery.where,
				include: baseQuery.include,
			});
			const productIds = dataProducts.map((product) => product.id);

			const dataStocks = await db.stock.findAll({
				where: { product_id: productIds, warehouse_id: warehouse },
				attributes: ["stocks", "id", "product_id"],
			});

			const combinedData = dataProducts.map((product) => {
				const associatedStock = dataStocks.find(
					(stock) => stock.product_id === product.id
				);

				return {
					...product.toJSON(),
					stock: associatedStock ? associatedStock.stocks : null,
					stock_id: associatedStock ? associatedStock.id : null,
				};
			});
			return {
				message: "Get products stocks data success",
				data: { count, products: combinedData },
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
						attributes: ["id", "warehouse_name"],
					},
					{
						model: db.product,
						attributes: ["id", "product_name"],
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
	findSpecificStock: async (productId, warehouseId) => {
		try {
			const dataStock = await db.stock.findOne({
				attributes: ["stocks"],
				where: { product_id: productId, warehouse_id: warehouseId },
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
			if (!newStocks || newStocks < 0) {
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
			if (newStocks == checkStock.dataValues.stocks) {
				return {
					message: "There is no change in quantity",
					data: null,
				};
			}
			let change = "";
			if (newStocks < checkStock.dataValues.stocks) {
				change = "subtraction";
			} else {
				change = "addition";
			}
			const quantity = Math.abs(
				Number(checkStock.dataValues.stocks) - Number(newStocks)
			);

			const dataLog = {
				change,
				type: "manual",
				stock_id: stockId,
				stock_before: checkStock.dataValues.stocks,
				quantity_change: quantity,
			};

			const updateLog = await db.stock_history.create(dataLog);

			const updateStock = await db.stock.update(
				{ stocks: newStocks },
				{ where: { id: stockId } }
			);
			return { message: "Update stock data success", data: null };
		} catch (error) {
			return error;
		}
	},
	findStockHistories: async (warehouseId) => {
		try {
			const baseQuery = {
				attributes: [
					"id",
					"change",
					"stock_before",
					"quantity_change",
					"type",
					"createdAt",
					"user_id",
					"stock_mutation_id",
				],
				include: [
					{
						model: db.stock,
						attributes: ["id", "stocks"],
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
					},
				],
				order: [["createdAt", "desc"]],
			};
			if (warehouseId) {
				baseQuery.include[0].where = { warehouse_id: warehouseId };
			}
			const dataLogStock = await db.stock_history.findAll(baseQuery);
			if (!dataLogStock) {
				return {
					isError: true,
					message: `There is no change in stock`,
					data: null,
				};
			}

			const count = await db.stock_history.count({
				where: baseQuery.where,
				include: baseQuery.include,
			});

			return {
				message: "Get stock change log success",
				data: { count, history: dataLogStock },
			};
		} catch (error) {
			return error;
		}
	},
	findIncomingMutation: async (query) => {
		try {
			const { warehouse, status, offset } = query;
			if (!warehouse) {
				return { isError: true, message: "Please select warehouse" };
			}
			const baseQuery = {
				attributes: {
					exclude: ["updatedAt", "deletedAt", "warehouse_id_from"],
				},
				include: [
					// { model: db.user, as: "admin_from" },
					{
						model: db.product,
						attributes: ["id", "product_name"],
						include: [
							{
								model: db.stock,
								where: { warehouse_id: warehouse },
								limit: 1,
							},
						],
					},
					{
						model: db.warehouse,
						as: "warehouse_from",
						attributes: ["id", "warehouse_name"],
					},
				],
				where: { warehouse_id_to: warehouse },
				limit: 12,
				order: [["createdAt", "desc"]],
			};
			if (offset) {
				baseQuery.offset = Number(offset);
			}
			if (status) {
				baseQuery.where = { warehouse_id_to: warehouse, status };
			}
			const dataMutation = await db.stock_mutation.findAll(baseQuery);
			const count = await db.stock_mutation.count({
				where: baseQuery.where,
				include: baseQuery.include,
			});
			return {
				message: "Get incoming mutation success",
				data: { count, mutations: dataMutation },
			};
		} catch (error) {
			return error;
		}
	},
	findOutgoingMutation: async (query) => {
		try {
			const { warehouse, status, offset } = query;
			if (!warehouse) {
				return { isError: true, message: "Please select warehouse" };
			}
			const baseQuery = {
				attributes: {
					exclude: ["updatedAt", "deletedAt", "warehouse_id_to"],
				},
				include: [
					// { model: db.user, as: "admin_from" },
					{
						model: db.product,
						attributes: ["id", "product_name"],
						include: [
							{
								model: db.stock,
								where: { warehouse_id: warehouse },
								limit: 1,
							},
						],
					},
					{
						model: db.warehouse,
						as: "warehouse_to",
						attributes: ["id", "warehouse_name"],
					},
				],
				where: { warehouse_id_from: warehouse },
				limit: 12,
				order: [["createdAt", "desc"]],
			};
			if (offset) {
				baseQuery.offset = Number(offset);
			}
			if (status) {
				baseQuery.where = { warehouse_id_from: warehouse, status };
			}
			const dataMutation = await db.stock_mutation.findAll(baseQuery);
			const count = await db.stock_mutation.count({
				where: baseQuery.where,
				include: baseQuery.include,
			});
			return {
				message: "Get outgoing mutation success",
				data: { count, mutations: dataMutation },
			};
		} catch (error) {
			return error;
		}
	},
	addMutation: async (data) => {
		try {
			if (!data) {
				return { isError: true, message: "Please provide the data" };
			}
			const {
				warehouse_id_to,
				warehouse_id_from,
				product_id,
				status,
				quantity,
			} = data;

			const checkWarehouse1 = await db.warehouse.findByPk(
				warehouse_id_to
			);
			if (!checkWarehouse1) {
				return {
					isError: true,
					message: `Destination warehouse is not found`,
				};
			}
			const checkWarehouse2 = await db.warehouse.findByPk(
				warehouse_id_from
			);
			if (!checkWarehouse2) {
				return {
					isError: true,
					message: `Original warehouse is not found`,
				};
			}
			const checkProduct = await db.product.findByPk(product_id);
			if (!checkProduct) {
				return {
					isError: true,
					message: `Product is not found`,
				};
			}
			if (status === "accepted") {
				const stock_from = await db.stock.findOne({
					where: { product_id, warehouse_id: warehouse_id_to },
				});
				const stock_to = await db.stock.findOne({
					where: { product_id, warehouse_id: warehouse_id_from },
				});
				const newStocksFrom =
					Number(stock_from.stocks) - Number(quantity);
				if (newStocksFrom < 0) {
					await db.stock_mutation.update(
						{ status: "rejected" },
						{ where: { id: mutationId } },
						{
							transaction: t,
						}
					);
					await t.commit();
					return {
						isError: true,
						message: `There are not enough stocks, the request is automatically rejected`,
					};
				}
				const newStocksTo = Number(stock_to.stocks) - Number(quantity);
				await db.stock.update(
					{ stocks: newStocksFrom },
					{ where: { id: stock_from.id } },
					{
						transaction: t,
					}
				);
				await db.stock.update(
					{ stocks: newStocksTo },
					{ where: { id: stock_to.id } },
					{
						transaction: t,
					}
				);
				const dataLogFrom = {
					change: "subtraction",
					type: "mutation",
					stock_id: stock_from.id,
					stock_before: stock_from.stocks,
					quantity_change: quantity,
				};
				const dataLogTo = {
					change: "addition",
					type: "mutation",
					stock_id: stock_to.id,
					stock_before: stock_to.stocks,
					quantity_change: quantity,
				};

				await db.stock_history.bulkCreate([dataLogFrom, dataLogTo], {
					transaction: t,
				});
			}
			const createData = await db.stock_mutation.create(data);
			return { message: "Create request success" };
		} catch (error) {
			return error;
		}
	},
	updateMutationStatus: async (mutationId, newStatus) => {
		const t = await sequelize.transaction();
		try {
			if (!newStatus) {
				return { isError: true, message: "Please provide the change" };
			}
			const checkMutation = await db.stock_mutation.findByPk(mutationId);
			if (!checkMutation) {
				return {
					isError: true,
					message: `Stock mutation is not found`,
				};
			}
			const { product_id, warehouse_id_from, warehouse_id_to, status } =
				checkMutation;
			if (
				status === "rejected" ||
				status === "accepted" ||
				status === "canceled"
			) {
				return { message: "Mutation process is already completed" };
			}
			if (newStatus === "accepted") {
				const stock_from = await db.stock.findOne({
					where: { product_id, warehouse_id: warehouse_id_to },
				});
				const stock_to = await db.stock.findOne({
					where: { product_id, warehouse_id: warehouse_id_from },
				});
				const newStocksFrom =
					Number(stock_from.stocks) - Number(checkMutation.quantity);
				if (newStocksFrom < 0) {
					await db.stock_mutation.update(
						{ status: "rejected" },
						{ where: { id: mutationId } },
						{
							transaction: t,
						}
					);
					await t.commit();
					return {
						isError: true,
						message: `There are not enough stocks, the request is automatically rejected`,
					};
				}
				const newStocksTo =
					Number(stock_to.stocks) + Number(checkMutation.quantity);
				await db.stock.update(
					{ stocks: newStocksFrom },
					{ where: { id: stock_from.id } },
					{
						transaction: t,
					}
				);
				await db.stock.update(
					{ stocks: newStocksTo },
					{ where: { id: stock_to.id } },
					{
						transaction: t,
					}
				);
				const dataLogFrom = {
					change: "subtraction",
					type: "mutation",
					stock_id: stock_from.id,
					stock_before: stock_from.stocks,
					quantity_change: checkMutation.quantity,
				};
				const dataLogTo = {
					change: "addition",
					type: "mutation",
					stock_id: stock_to.id,
					stock_before: stock_to.stocks,
					quantity_change: checkMutation.quantity,
				};

				await db.stock_history.bulkCreate([dataLogFrom, dataLogTo], {
					transaction: t,
				});
			}
			const updateMutation = await db.stock_mutation.update(
				{ status: newStatus },
				{ where: { id: mutationId } },
				{
					transaction: t,
				}
			);
			await t.commit();
			return { message: "Update mutation success" };
		} catch (error) {
			await t.rollback();
			return error;
		}
	},
};
