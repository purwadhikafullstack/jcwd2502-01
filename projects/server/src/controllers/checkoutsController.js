const db = require("./../models");
const axios = require("axios");
const { RAJA_ONGKIR_API_KEY, RAJA_ONGKIR_BASE_URL } = process.env;

const respHandler = require("../utils/respHandler");

module.exports = {
	getShipmentCost: async (req, res, next) => {
		try {
			const { origin, destination, weight, courier } = req.body;

			const cost = await axios.post(
				`${RAJA_ONGKIR_BASE_URL}cost`,
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
				"Get cities success",
				cost.data.rajaongkir.results[0].costs
			);
		} catch (error) {
			console.log(error);
		}
	},
};
