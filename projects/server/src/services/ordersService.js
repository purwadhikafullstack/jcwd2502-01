const db = require("./../models");
const { Op } = require("sequelize");

const Sequelize = require("sequelize");

const { updateStock, createMutation } = require("../utils/orderUtils");
const { findNearestWarehouses } = require("../utils/distanceUtils");

const moment = require("moment");
const schedule = require("node-schedule");

module.exports = {
	adminCancelOrderService: async (orderId) => {
		try {
			const checkOrder = await db.order.findByPk(orderId);

			if (Number(checkOrder.status) < 3) {
				await db.order.update(
					{ status: 6 },
					{
						where: {
							id: orderId,
						},
					}
				);
				return { message: "Cancel order success" };
			}

			if (Number(checkOrder.status) === 3) {
				const userOrderItems = await db.order_detail.findAll({
					where: { order_id: checkOrder.id },
				});

				updateStock(userOrderItems, checkOrder.warehouse_id, true);

				await db.order.update(
					{ status: 6 },
					{
						where: {
							id: orderId,
						},
					}
				);
				return { message: "Cancel order success" };
			}

			if (Number(checkOrder.status) > 3) {
				return {
					isError: true,
					message: "Order can not be canceled anymore",
				};
			}

			return { message: "Cancel order success" };
		} catch (error) {
			return error;
		}
	},
	adminConfirmOrderService: async (id) => {
		try {
			const userOrder = await db.order.findOne({ where: { id } });

			const selectedWarehouseId = userOrder.warehouse_id;

			if (!userOrder) throw { message: "Order not found." };

			if (!userOrder?.proof_of_payment)
				throw { message: "This order has not been paid for yet." };

			if (Number(userOrder?.status) === 3)
				throw {
					message: "This order has already undergone processing.",
				};

			await db.order.update({ status: 3 }, { where: { id } });

			const userOrderItems = await db.order_detail.findAll({
				where: { order_id: id },
			});

			const orderItemId = userOrderItems.map((item) => item.id);
			const productId = userOrderItems.map((item) => item.product_id);
			const itemQuantity = userOrderItems.map((item) => item.quantity);

			const selectedOriginWarehouse = await db.warehouse.findOne({
				where: { id: selectedWarehouseId },
			});

			const {
				latitude: originWarehouseLat,
				longitude: originWarehouseLon,
			} = selectedOriginWarehouse;

			const productStockByOriginWarehouse = await Promise.all(
				productId.map(async (product) => {
					const productStock = await db.stock.findAll({
						where: {
							warehouse_id: selectedWarehouseId,
							product_id: product,
						},
					});
					return productStock[0].stocks;
				})
			);

			const reducedStockQuantity = productStockByOriginWarehouse.map(
				(stock, i) => ({
					item_id: orderItemId[i],
					product_id: productId[i],
					quantity: itemQuantity[i],
					stocks: stock - itemQuantity[i],
				})
			);

			const stockMutation = reducedStockQuantity
				.filter((item) => item.stocks < 0)
				.map((item) => ({
					...item,
					needed_quantity: Math.abs(item.stocks),
				}));

			if (stockMutation.length) {
				const otherWarehouses = await db.warehouse.findAll({
					where: {
						id: {
							[Op.not]: selectedWarehouseId,
						},
					},
				});

				const { sortedWarehousesId } = findNearestWarehouses(
					originWarehouseLat,
					originWarehouseLon,
					otherWarehouses
				);

				for (const item of stockMutation) {
					let neededQuantity = item.needed_quantity;

					for (const warehouse of sortedWarehousesId) {
						if (neededQuantity === 0) {
							break;
						}

						const productStock = await db.stock.findOne({
							where: {
								warehouse_id: warehouse,
								product_id: item.product_id,
							},
						});

						if (productStock.dataValues.stocks >= neededQuantity) {
							await createMutation(
								warehouse,
								selectedWarehouseId,
								item.product_id,
								neededQuantity
							);

							neededQuantity = 0;
						} else if (
							productStock.dataValues.stocks > 0 &&
							productStock.dataValues.stocks < neededQuantity
						) {
							await createMutation(
								warehouse,
								selectedWarehouseId,
								item.product_id,
								productStock.dataValues.stocks
							);

							neededQuantity -= productStock.dataValues.stocks;
						} else {
							continue;
						}
					}
				}

				await updateStock(userOrderItems, selectedWarehouseId, false);

				return { message: "Confirm order 22222 success" };
			} else if (!stockMutation.length) {
				await updateStock(userOrderItems, selectedWarehouseId, false);
				return { message: "Confirm order 111111 success" };
			}
		} catch (error) {
			return error;
		}
	},
	adminSendingOrder: async (id) => {
		try {
			const checkOrder = await db.order.findByPk(id);

			if (Number(checkOrder.status) === 3) {
				await db.order.update({ status: 4 }, { where: { id } });

				const scheduledDate = moment().add(7, "days").toDate();
				schedule.scheduleJob(scheduledDate, async function () {
					await db.order.update({ status: 5 }, { where: { id } });
				});

				return {
					message:
						"Order rejected successfully. If not confirmed within 7 days, it will be marked as confirmed/finished.",
				};
			}

			return {
				message:
					"Unable to proceed with sending the order. The user has not completed the payment process.",
			};
		} catch (error) {
			return error;
		}
	},
};
