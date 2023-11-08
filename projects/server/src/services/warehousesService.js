const db = require("./../models");
const { Op } = require("sequelize");

module.exports = {
	findAllWarehouses: async () => {
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
					"warehouse_location",
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
		try {
			const createWarehouse = await db.warehouse.create(data);
			if (adminId) {
				await db.user.update(
					{ warehouse_id: createWarehouse.id },
					{ where: { id: adminId } }
				);
			}
			return { message: "Create warehouse success" };
		} catch (error) {
			return error;
		}
	},
	updateWarehouse: async (warehouseId, data) => {
		try {
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
