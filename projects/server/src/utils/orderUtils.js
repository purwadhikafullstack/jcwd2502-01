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

	try {
		const data = {
			warehouse_id_to,
			warehouse_id_from,
			product_id,
			status: "accepted",
			quantity,
		};

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
		const newStocksTo = Number(stock_to.stocks) + Number(quantity);
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

		const createData = await db.stock_mutation.create(data, {
			transaction: t,
		});

		await t.commit();
		return { message: "Create request success" };
	} catch (error) {
		await t.rollback();
		return error;
	}
};

const updateStock = async (
	orderItems,
	originWarehouseId,
	isCancelOrder = false
) => {
	for (const order of orderItems) {
		try {
			const productStock = await db.stock.findOne({
				where: {
					warehouse_id: originWarehouseId,
					product_id: order.product_id,
				},
			});

			if (productStock && !isCancelOrder) {
				const updatedStock = productStock.stocks - order.quantity;

				const logData = {
					change: "subtraction",
					type: "transaction",
					stock_id: productStock.id,
					stock_before: productStock.stocks,
					quantity_change: order.quantity,
				};

				await db.stock.update(
					{ stocks: updatedStock },
					{
						where: {
							warehouse_id: originWarehouseId,
							product_id: order.product_id,
						},
					}
				);

				await db.stock_history.create(logData);
			} else if (productStock && isCancelOrder) {
				const updatedStock = productStock.stocks + order.quantity;

				const logData = {
					change: "addittion",
					type: "transaction",
					stock_id: productStock.id,
					stock_before: productStock.stocks,
					quantity_change: order.quantity,
				};

				await db.stock.update(
					{ stocks: updatedStock },
					{
						where: {
							warehouse_id: originWarehouseId,
							product_id: order.product_id,
						},
					}
				);

				await db.stock_history.create(logData);
			} else {
				console.log(
					"Product stock not found for product_id:",
					order.product_id
				);
			}
		} catch (error) {
			console.error("Error updating stock:", error);
		}
	}
};

module.exports = { createMutation, updateStock };
