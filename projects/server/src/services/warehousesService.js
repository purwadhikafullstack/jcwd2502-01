const db = require("./../models");
const { Op } = require("sequelize");
const { sequelize } = require("./../models");
const fetch = require("node-fetch");
const zlib = require("zlib");

const getLatitudeLongitude = async (cityName) => {
	try {
		const response = await fetch(
			`${process.env.OPENCAGE_BASE_URL}q=${cityName},indonesia&key=${process.env.OPENCAGE_API_KEY}`
		);
		const responseJson = await response.json();
		const result = responseJson.results[0];
		const geometry = result.geometry;
		const latitude = geometry.lat;
		const longitude = geometry.lng;
		return { latitude, longitude };
	} catch (error) {
		console.log(error);
		throw error;
	}
};

module.exports = {
	findAllWarehouses: async (query) => {
		try {
			const dataWarehouses = await db.warehouse.findAll({
				attributes: [
					"id",
					"warehouse_name",
					// "warehouse_location",
					"warehouse_address",
				],
				include: [
					{
						model: db.user,
						attributes: ["id", "username"],
					},
					{
						model: db.city,
						attributes: ["id", "type", "city_name", "postal_code"],
					},
					{
						model: db.province,
						attributes: ["id", "province"],
					},
				],
			});
			return {
				message: "Get product's data success",
				data: dataWarehouses,
			};

			const dataCategoriesWithProducts = await db.category.findAll(
				baseQuery
			);
			const count = await db.category.count();

			return {
				message: "Get categories success",
				data: { count, categories: dataCategoriesWithProducts },
			};
		} catch (error) {
			return error;
		}
	},
	findWarehouseList: async (query) => {
		try {
			const { offset, orderField, orderDirection } = query;

			const orderOptions = [];
			if (orderField && orderDirection) {
				orderOptions.push([orderField, orderDirection]);
			}
			const baseQuery = {
				attributes: [
					"id",
					"warehouse_name",
					"warehouse_address",
					"updatedAt",
				],
				include: [
					{
						model: db.user,
						attributes: ["id", "username"],
					},
					{
						model: db.city,
						attributes: ["id", "type", "city_name", "postal_code"],
					},
					{
						model: db.province,
						attributes: ["id", "province"],
					},
				],
				limit: 12,
				offset: Number(offset) || 0,
				order: orderOptions,
			};
			const dataWarehouses = await db.warehouse.findAll(baseQuery);
			const count = await db.warehouse.count({
				where: baseQuery.where,
				include: baseQuery.include,
			});
			return {
				message: "Get product's data success",
				data: { count, warehouses: dataWarehouses },
			};
		} catch (error) {
			return error;
		}
	},
	findOtherWarehouses: async (warehouseId) => {
		try {
			const dataWarehouses = await db.warehouse.findAll({
				attributes: ["id", "warehouse_name"],
				where: {
					id: {
						[Op.not]: warehouseId,
					},
				},
			});
			return {
				message: "Get product's data success",
				data: dataWarehouses,
			};
		} catch (error) {
			return error;
		}
	},
	findWarehouse: async (warehouseId) => {
		try {
			const dataWarehouse = await db.warehouse.findOne({
				attributes: [
					"id",
					"warehouse_name",
					// "warehouse_location",
					"warehouse_address",
				],
				include: [
					{
						model: db.user,
						attributes: ["id", "username"],
					},
					{
						model: db.city,
						attributes: ["id", "type", "city_name", "postal_code"],
					},
					{
						model: db.province,
						attributes: ["id", "province"],
					},
				],
				where: { id: warehouseId },
			});
			return { message: "Get warehouse success", data: dataWarehouse };
		} catch (error) {
			return error;
		}
	},
	addWarehouse: async (data, adminId) => {
		const t = await sequelize.transaction();
		try {
			const { city_id } = data;
			const cityName = await db.city.findOne({ where: { id: city_id } });
			const { latitude, longitude } = await getLatitudeLongitude(
				cityName.dataValues.city_name
			);
			data.latitude = latitude;
			data.longitude = longitude;
			const createWarehouse = await db.warehouse.create(data, {
				transaction: t,
			});

			const dataProduct = await db.product.findAll();
			const dataStock = [];
			dataProduct.map((product) => {
				dataStock.push({
					stocks: 0,
					product_id: product.id,
					warehouse_id: createWarehouse.dataValues.id,
				});
			});
			const addStock = await db.stock.bulkCreate(dataStock, {
				transaction: t,
			});
			await t.commit();
			return { message: "Create warehouse success" };
		} catch (error) {
			await t.rollback();
			return error;
		}
	},
	updateWarehouse: async (warehouseId, data) => {
		try {
			const { city_id } = data;
			const cityName = await db.city.findOne({ where: { id: city_id } });
			const { latitude, longitude } = await getLatitudeLongitude(
				cityName.dataValues.city_name
			);
			data.latitude = latitude;
			data.longitude = longitude;
			const updatedWarehouse = await db.warehouse.update(data, {
				where: { id: warehouseId },
			});
			return { message: "Update warehouse success" };
		} catch (error) {
			return error;
		}
	},
	removeWarehouse: async (warehouseId) => {
		try {
			// const users = await db.user.findAll({
			// 	include: [
			// 		{
			// 			model: db.warehouse,
			// 			where: { id: warehouseId },
			// 		},
			// 	],
			// });
			await db.warehouse.destroy({
				where: { id: warehouseId },
			});
			return {
				message: "Delete warehouse success",
				data: null,
			};
		} catch (error) {
			return error;
		}
	},
};
