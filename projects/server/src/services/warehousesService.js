const db = require("./../models");
const { Op } = require("sequelize");

module.exports = {
	findAllWarehouses: async (productId) => {
		try {
			const dataWarehouses = await db.warehouse.findAll({
				attributes: ["id", "warehouse_name", "warehouse_location"],
				include: [
					{
						model: db.user,
						attributes: {
							exclude: [
								"createdAt",
								"updatedAt",
								"deletedAt",
								"password",
								"status",
							],
						},
					},
				],
			});
			return dataWarehouses;
		} catch (error) {
			return error;
		}
	},
	addWarehouse: async (data, adminId) => {
		try {
			const createWarehouse = await db.warehouse.create(data);
			if (adminId) {
				const warehouse = await db.warehouse.findByPk(
					createWarehouse.id
				);
				const user = await db.user.findByPk(adminId);

				if (!user || !warehouse) {
					return { message: "User or warehouse not found" };
				}
				await user.addWarehouse(warehouse);
			}
			return { message: "Create warehouse success" };
		} catch (error) {
			return error;
		}
	},
	updateWarehouse: async (warehouseId, data) => {
		try {
			const updateWarehouse = await db.warehouse.update(data, {
				where: { id: warehouseId },
			});
			return {
				message: "Update warehouse success",
				data: updateWarehouse,
			};
		} catch (error) {
			return error;
		}
	},
	removeWarehouse: async (warehouseId) => {
		try {
			const users = await db.user.findAll({
				include: [
					{
						model: db.warehouse,
						where: { id: warehouseId },
					},
				],
			});
			for (const user of users) {
				await user.removeWarehouse(warehouseId);
			}
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
	getAssociationForUser: async (userId) => {
		try {
			const user = await db.user.findByPk(userId);

			if (!user) {
				console.log("User not found");
				return;
			}

			const associations = await user.getWarehouses();
			return associations;
		} catch (error) {
			return error;
		}
	},
	addAssociationForUser: async (userId, warehouseId) => {
		try {
			const user = await db.user.findByPk(userId);
			const warehouse = await db.warehouse.findByPk(warehouseId);

			if (!user || !warehouse) {
				console.log("User or warehouse not found");
				return;
			}

			await user.addWarehouses(warehouse);
		} catch (error) {
			return error;
		}
	},
	updateAssociationsForUser: async (userId, newWarehouseIds) => {
		try {
			const user = await db.user.findByPk(userId);

			if (!user) {
				console.log("User not found");
				return;
			}

			await user.setWarehouses(newWarehouseIds);
		} catch (error) {
			return error;
		}
	},
	removeAssociationsForUser: async (userId, warehouseId) => {
		try {
			const user = await db.user.findByPk(userId);

			if (!user) {
				console.log("User not found");
				return;
			}

			await user.removeWarehouses(warehouseId);
		} catch (error) {
			return error;
		}
	},
};
