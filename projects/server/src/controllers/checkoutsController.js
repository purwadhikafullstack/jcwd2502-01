const db = require("./../models");
const axios = require("axios");
const { RAJA_ONGKIR_API_KEY, RAJA_ONGKIR_BASE_URL } = process.env;

const respHandler = require("../utils/respHandler");
const distanceUtils = require("../utils/distanceUtils");

module.exports = {
	getSelectedCheckoutProducts: async (req, res, next) => {
		try {
			const { id } = req.dataToken;

			const selectedCheckoutProducts = await db.cart.findAll({
				where: {
					user_id: id,
					status: true,
				},
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
			});

			respHandler(
				res,
				"Get selected products for checkout success",
				selectedCheckoutProducts
			);
		} catch (error) {
			next(error);
		}
	},
	getNearestWarehouse: async (req, res, next) => {
		try {
			const { id: user_id } = req.dataToken;
			const { user_address_id } = req.params;

			const selectedUserAddress = await db.user_address.findOne({
				where: { user_id, id: user_address_id },
				attributes: {
					exclude: ["createdAt", "updatedAt", "deletedAt"],
				},
			});

			const { latitude: userLat, longitude: userLon } =
				selectedUserAddress;

			const warehouses = await db.warehouse.findAll({
				attributes: {
					exclude: ["createdAt", "updatedAt", "deletedAt"],
				},
			});

			const nearestWarehouse = distanceUtils.findNearestWarehouse(
				userLat,
				userLon,
				warehouses
			);

			if (nearestWarehouse) {
				respHandler(
					res,
					"Get nearest warehouse success",
					nearestWarehouse,
					200
				);
			} else {
				throw { message: "Get nearest warehouse fail" };
			}
		} catch (error) {
			next(error);
		}
	},
	getShipmentCost: async (req, res, next) => {
		try {
			const { origin, destination, weight, courier } = req.body;

			const cost = await axios.post(
				`${RAJA_ONGKIR_BASE_URL}/cost`,
				{
					origin,
					destination,
					weight,
					courier,
				},
				{
					headers: {
						key: RAJA_ONGKIR_API_KEY,
						"content-type": "application/x-www-form-urlencoded",
					},
				}
			);

			respHandler(
				res,
				"Get shipment cost success",
				cost.data.rajaongkir.results[0].costs
			);
		} catch (error) {
			next(error);
		}
	},
	createOrder: async (req, res, next) => {
		try {
			const { id: user_id } = req.dataToken;

			const time = new Date();

			const {
				total_amount,
				shipping_cost,
				total_item,
				address_id,
				warehouse_id,
				items,
			} = req.body;

			const shippingCost = Number(shipping_cost);

			const invoice = `INV/${time.getFullYear()}${
				time.getMonth() + 1
			}${time.getDate()}/NXCMP/${Math.floor(
				100000 + Math.random() * 900000
			)}`;

			const receipt_number =
				10000000 + Math.floor(Math.random() * 90000000);

			const createOrder = await db.order.create({
				total_amount,
				shipping_cost: shippingCost,
				total_item,
				status: 1,
				invoice,
				receipt_number,
				user_id,
				address_id,
				warehouse_id,
			});

			for (const item of items) {
				await db.order_detail.create({
					quantity: item.quantity,
					checked_out_price: item.product.product_price,
					order_id: createOrder.id,
					product_id: item.product.id,
				});
			}

			await db.cart.destroy({ where: { status: true } });

			respHandler(res, "Create order success");
		} catch (error) {
			next(error);
		}
	},
	uploadPaymentProof: async (req, res, next) => {
		try {
			const { id: user_id } = req.dataToken;
			const { order_id } = req.params;
			const fileImage = req.file;

			const checkOrderPayment = await db.order.findOne({
				where: { id: order_id, user_id },
			});
			const paymentHasPaid = checkOrderPayment.proof_of_payment;

			if (paymentHasPaid)
				throw {
					message:
						"Your transaction has already been settled with your payment.",
				};
			// respHandler(res, "Upload payment proof success", null, 201);

			await db.order.update(
				{
					proof_of_payment: `public/payment-proof/${fileImage.filename}`,
					status: 2,
				},
				{ where: { id: order_id, user_id } }
			);

			respHandler(res, "Upload payment proof success", null, 201);
		} catch (error) {
			next(error);
		}
	},
};
