const db = require("./../models");
const axios = require("axios");
const { RAJA_ONGKIR_API_KEY, RAJA_ONGKIR_BASE_URL } = process.env;

const respHandler = require("../utils/respHandler");

module.exports = {
	getSelectedCheckoutProducts: async (req, res, next) => {
		try {
			const { id } = req.dataToken;

			const selectedCheckoutProducts = await db.cart.findAll({
				where: {
					user_id: id,
					status: "checked",
				},
				attributes: {
					exclude: ["createdAt", "updatedAt", "deletedAt"],
				},
				include: [
					{
						model: db.product,
						attributes: ["id", "product_name", "product_price"],
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
};
