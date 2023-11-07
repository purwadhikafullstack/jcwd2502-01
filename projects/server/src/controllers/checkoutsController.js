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
			const { userLat, userLon } = req.body; // Assuming you get user's coordinates from the request body

			const warehouses = [
				{
					id: 1,
					name: "Warehouse Kota Bandung",
					lat: "-6.914744",
					lon: "107.60981",
				},
				{
					id: 2,
					name: "Warehouse Kota Jakarta Pusat",
					lat: "-6.2088",
					lon: "106.8456",
				},
				{
					id: 3,
					name: "Warehouse Kota Tangerang Selatan",
					lat: "-6.2088",
					lon: "106.717",
				},
				{
					id: 4,
					name: "Warehouse Kota Tangerang Utara",
					lat: "-6.136197",
					lon: "106.9006902",
				},
			];

			function calculateDistance(lat1, lon1, lat2, lon2) {
				const R = 6371; // Earth's radius in kilometers
				const dLat = (lat2 - lat1) * (Math.PI / 180);
				const dLon = (lon2 - lon1) * (Math.PI / 180);
				const a =
					Math.sin(dLat / 2) * Math.sin(dLat / 2) +
					Math.cos(lat1 * (Math.PI / 180)) *
						Math.cos(lat2 * (Math.PI / 180)) *
						Math.sin(dLon / 2) *
						Math.sin(dLon / 2);
				const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
				const distance = R * c; // Distance in kilometers
				return distance;
			}

			// Find the nearest warehouse
			function findNearestWarehouse(userLat, userLon, warehouses) {
				let nearestWarehouse = null;
				let minDistance = Number.MAX_VALUE;
				for (const warehouse of warehouses) {
					const distance = calculateDistance(
						Number(userLat),
						Number(userLon),
						Number(warehouse.lat),
						Number(warehouse.lon)
					);
					if (distance < minDistance) {
						minDistance = distance;
						nearestWarehouse = warehouse;
					}
				}
				return nearestWarehouse;
			}

			const nearestWarehouse = findNearestWarehouse(
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
};
