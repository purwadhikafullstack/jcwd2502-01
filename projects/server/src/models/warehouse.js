"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class warehouse extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({
			stock,
			stock_mutation,
			order,
			user,
			city,
			province,
		}) {
			this.hasMany(stock, { foreignKey: "warehouse_id" });
			this.hasMany(stock_mutation, {
				as: "warehouse_to",
				foreignKey: "warehouse_id_to",
			});
			this.hasMany(stock_mutation, {
				as: "warehouse_from",
				foreignKey: "warehouse_id_from",
			});
			this.hasHooks(order, { foreignKey: "warehouse_id" });
			this.hasMany(user, {
				foreignKey: "warehouse_id",
			});
			this.belongsTo(city, { foreignKey: "city_id" });
			this.belongsTo(province, { foreignKey: "province_id" });
		}
	}
	warehouse.init(
		{
			warehouse_name: DataTypes.STRING,
			latitude: DataTypes.STRING,
			longitude: DataTypes.STRING,
			warehouse_address: DataTypes.STRING,
			createdAt: {
				type: DataTypes.DATE,
				defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updatedAt: {
				type: DataTypes.DATE,
				defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
			},
		},
		{
			sequelize,
			modelName: "warehouse",
			paranoid: true,
		}
	);
	return warehouse;
};
