const db = require("../models");
const { sequelize } = require("../models");
const { Op } = require("sequelize");

const createMutation = async (
	warehouse_id_to,
	warehouse_id_from,
	product_id,
	quantity
) => {
	const t = await sequelize.transaction();

	const checkWarehouse1 = await db.warehouse.findByPk(warehouse_id_to);

	if (!checkWarehouse1) {
		return {
			isError: true,
			message: `Destination warehouse is not found`,
		};
	}

	const checkWarehouse2 = await db.warehouse.findByPk(warehouse_id_from);

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

	const stock_from = await db.stock.findOne({
		where: { product_id, warehouse_id: warehouse_id_to },
	});

	const stock_to = await db.stock.findOne({
		where: { product_id, warehouse_id: warehouse_id_from },
	});

	const newStocksFrom = Number(stock_from.stocks) - Number(quantity);

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

	const createData = await db.stock_mutation.create(data);
};

const updateStock = () => {
	return;
};

module.exports = { createMutation, updateStock };

// const orderMutation = [
// 	{
// 		item_id: 55,
// 		product_id: 24,
// 		quantity: 15,
// 		stocks: -5,
// 		needed_quantity: 5,
// 	},
// 	{
// 		item_id: 56,
// 		product_id: 9,
// 		quantity: 12,
// 		stocks: -2,
// 		needed_quantity: 2,
// 	},
// ];

// const sortedWarehouseId = [25, 2, 3, 24];

// const stocks = [
// 	{
// 		id: 70,
// 		stocks: 10,
// 		product_id: 24,
// 		warehouse_id: 1,
// 	},
// 	{
// 		id: 71,
// 		stocks: 10,
// 		product_id: 24,
// 		warehouse_id: 2,
// 	},
// 	{
// 		id: 72,
// 		stocks: 10,
// 		product_id: 24,
// 		warehouse_id: 3,
// 	},
// 	{
// 		id: 442,
// 		stocks: 0,
// 		product_id: 24,
// 		warehouse_id: 24,
// 	},
// 	{
// 		id: 510,
// 		stocks: 0,
// 		product_id: 24,
// 		warehouse_id: 25,
// 	},
// 	{
// 		id: 25,
// 		stocks: 10,
// 		product_id: 9,
// 		warehouse_id: 1,
// 	},
// 	{
// 		id: 26,
// 		stocks: 10,
// 		product_id: 9,
// 		warehouse_id: 2,
// 	},
// 	{
// 		id: 27,
// 		stocks: 10,
// 		product_id: 9,
// 		warehouse_id: 3,
// 	},
// 	{
// 		id: 427,
// 		stocks: 0,
// 		product_id: 9,
// 		warehouse_id: 24,
// 	},
// 	{
// 		id: 495,
// 		stocks: 0,
// 		product_id: 9,
// 		warehouse_id: 25,
// 	},
// ];
