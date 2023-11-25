const db = require("./../models");
const { Op } = require("sequelize");

const { adminCancelOrderService } = require("../services/ordersService");
const { findNearestWarehouses } = require("../utils/distanceUtils");
const respHandler = require("../utils/respHandler");

module.exports = {
	getOrderList: async (req, res, next) => {
		try {
			const { id: user_id } = req.dataToken;
			const { page = 1, status } = req.query;

			const itemsPerPage = 6;
			const offset = (page - 1) * itemsPerPage;

			const whereCondition = {
				user_id,
			};

			if (status) {
				// If status is provided, filter by status
				whereCondition.status = status;
			}

			const orderList = await db.order.findAndCountAll({
				where: whereCondition,
				attributes: {
					exclude: ["updatedAt", "deletedAt"],
				},
				include: [
					{
						model: db.order_detail,
						attributes: {
							exclude: ["createdAt", "updatedAt", "deletedAt"],
						},
						include: [
							{
								model: db.product,
								attributes: [
									"id",
									"weight",
									"product_name",
									"product_price",
								],
								include: [
									{
										model: db.product_image,
										attributes: ["image", "id"],
										limit: 1,
									},
									{
										model: db.specification,
										attributes: ["weight"],
									},
								],
							},
						],
					},
				],
				order: [["createdAt", "DESC"]],
				limit: itemsPerPage,
				distinct: true,
				paranoid: false,
				offset,
			});

			const totalPages = Math.ceil(orderList.count / itemsPerPage);

			respHandler(res, "Get order list success", {
				orderList: orderList.rows,
				pagination: {
					page: +page,
					count: orderList.count,
					totalPages,
					totalItems: orderList.count,
				},
			});
		} catch (error) {
			next(error);
		}
	},
	getOrderDetails: async (req, res, next) => {
		try {
			const { id: user_id } = req.dataToken;
			const { receipt_number: rn } = req.params;

			const receipt_number = Number(rn);

			const orderDetails = await db.order.findOne({
				where: {
					user_id,
					receipt_number,
				},
				attributes: {
					exclude: ["updatedAt", "deletedAt"],
				},
				include: [
					{
						model: db.order_detail,
						attributes: {
							exclude: ["createdAt", "updatedAt", "deletedAt"],
						},
						include: [
							{
								model: db.product,
								attributes: [
									"id",
									"weight",
									"product_name",
									"product_price",
								],
								include: [
									{
										model: db.product_image,
										attributes: ["image", "id"],
										limit: 1,
									},
									{
										model: db.specification,
										attributes: ["weight"],
									},
								],
							},
						],
					},
					{
						model: db.user_address,
						attributes: {
							exclude: ["createdAt", "updatedAt", "deletedAt"],
						},
						include: [
							{
								model: db.province,
								attributes: ["id", "province"],
							},
							{
								model: db.city,
								attributes: [
									"id",
									"type",
									"city_name",
									"postal_code",
								],
							},
						],
					},
				],
			});

			respHandler(res, "Get order details success", orderDetails);
		} catch (error) {
			next(error);
		}
	},
	cancelOrder: async (req, res, next) => {
		try {
			const { id: user_id } = req.dataToken;
			const { order_id: id } = req.params;

			await db.order.update(
				{ status: 6 },
				{
					where: {
						user_id,
						id,
					},
				}
			);

			respHandler(res, "Cancel order success");
		} catch (error) {
			next(error);
		}
	},
	adminGetAllUserOrderList: async (req, res, next) => {
		try {
			const { id: user_id } = req.dataToken;
			const { page = 1, status, search, warehouse_id } = req.query;

			const itemsPerPage = 12;
			const offset = (page - 1) * itemsPerPage;

			const whereCondition = {};

			if (status) {
				whereCondition.status = status;
			}

			if (search) {
				whereCondition[Op.or] = [
					{ receipt_number: { [Op.like]: `%${search}%` } },
					{ invoice: { [Op.like]: `%${search}%` } },
				];
			}

			if (warehouse_id) {
				whereCondition.warehouse_id = warehouse_id;
			}

			const orderList = await db.order.findAndCountAll({
				where: whereCondition,
				attributes: {
					exclude: ["updatedAt", "deletedAt"],
				},
				include: [
					{
						model: db.order_detail,
						attributes: {
							exclude: ["createdAt", "updatedAt", "deletedAt"],
						},
						include: [
							{
								model: db.product,
								attributes: [
									"id",
									"weight",
									"product_name",
									"product_price",
								],
								include: [
									{
										model: db.product_image,
										attributes: ["image", "id"],
										limit: 1,
									},
									{
										model: db.specification,
										attributes: ["weight"],
									},
								],
							},
						],
					},
					{
						model: db.warehouse,
						attributes: [
							"id",
							"warehouse_name",
							"warehouse_address",
						],
					},
					{
						model: db.user_address,
						attributes: {
							exclude: ["createdAt", "updatedAt", "deletedAt"],
						},
						include: [
							{
								model: db.province,
								attributes: ["id", "province"],
							},
							{
								model: db.city,
								attributes: [
									"id",
									"type",
									"city_name",
									"postal_code",
								],
							},
						],
					},
				],
				order: [["createdAt", "ASC"]],
				limit: itemsPerPage,
				distinct: true,
				paranoid: false,
				offset,
			});

			const totalPages = Math.ceil(orderList.count / itemsPerPage);

			respHandler(res, "Get order list success", {
				orderList: orderList.rows,
				pagination: {
					page: +page,
					count: orderList.count,
					totalPages,
					totalItems: orderList.count,
					offset,
				},
			});
		} catch (error) {
			next(error);
		}
	},
	adminConfirmOrder: async (req, res, next) => {
		try {
			const { order_id: id } = req.params;

			const userOrder = await db.order.findOne({ where: { id } });

			const selectedWarehouseId = userOrder.warehouse_id;

			// if (!userOrder) throw { message: "Order not found." };

			// if (!userOrder?.proof_of_payment)
			// 	throw { message: "This order has not been paid for yet." };

			// if (Number(userOrder?.status) === 3)
			// 	throw {
			// 		message: "This order has already undergone processing.",
			// 	};

			// await db.order.update({ status: 3 }, { where: { id } });

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

			const sumProductStocks = async () => {
				const totalStocks = await Promise.all(
					productId.map(async (productId) => {
						const productStock = await db.stock.findAll({
							where: {
								product_id: productId,
							},
						});
						return productStock;
					})
				);

				const result = {};

				totalStocks.forEach((productStocks) => {
					productStocks.forEach((stock) => {
						const { product_id, stocks } = stock;
						result[product_id] = (result[product_id] || 0) + stocks;
					});
				});

				return result;
			};

			const totalProductStockFromAllWarehouse = await sumProductStocks();

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

			const stocks = await Promise.all(
				productId.map(async (product, i) => {
					const productStock = await db.stock.findAll({
						where: {
							product_id: product,
						},
					});
					return productStock;
				})
			);

			respHandler(res, "Confirm order success", {
				productStockByOriginWarehouse,
				stockMutation,
				sortedWarehousesId,
			});
		} catch (error) {
			next(error);
		}
	},
	adminRejectOrder: async (req, res, next) => {
		try {
			const { order_id: id } = req.params;

			const checkOrder = await db.order.findByPk(id);

			if (Number(checkOrder.status) === 2) {
				await db.order.update(
					{
						status: 1,
						proof_of_payment: null,
						viewed: checkOrder.viewed + 1,
					},
					{ where: { id } }
				);

				return respHandler(res, "Reject order success");
			}

			respHandler(res, "Reject order failed. User have not pay yet.");
		} catch (error) {
			next(error);
		}
	},
	adminCancelOrder: async (req, res, next) => {
		try {
			const { order_id: id } = req.params;

			const result = await adminCancelOrderService(id);
			respHandler(res, result.message);
		} catch (error) {
			next(error);
		}
	},
};
