"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class user extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({
			stock_mutation,
			stock_history,
			user_address,
			order,
			cart,
			warehouse,
		}) {
			this.hasMany(stock_mutation, {
				as: "admin_to",
				foreignKey: "user_id_to",
			});
			this.hasMany(stock_mutation, {
				as: "admin_from",
				foreignKey: "user_id_from",
			});
			this.hasMany(user_address, { foreignKey: "user_id" });
			this.hasMany(order, { foreignKey: "user_id" });
			this.hasMany(cart, { foreignKey: "user_id" });
			this.hasMany(stock_history, { foreignKey: "user_id" });
			this.belongsTo(warehouse, { foreignKey: "warehouse_id" });
		}
	}
	user.init(
		{
			username: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			birth_date: DataTypes.STRING,
			gender: DataTypes.STRING,
			phone: DataTypes.STRING,
			profile_picture: DataTypes.STRING,
			role: DataTypes.STRING,
			status: DataTypes.STRING,
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
			modelName: "user",
			paranoid: true,
		}
	);
	return user;
};
