const db = require("./../models");
const { Op } = require("sequelize");
const respHandler = require("../utils/respHandler");

const { adminCancelOrderService } = require("../services/ordersService");

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

			const result = await adminCancelOrderService(id);
			respHandler(res, result.message);
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
