"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class stock_history extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ stock, user }) {
			this.belongsTo(user, { foreignKey: "user_id" });
			this.belongsTo(stock, { foreignKey: "stock_id" });
		}
	}
	stock_history.init(
		{
			change: DataTypes.INTEGER,
			final_stock: DataTypes.INTEGER,
			date: DataTypes.DATE,
			type: DataTypes.STRING,
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
			modelName: "stock_history",
			paranoid: true,
		}
	);
	return stock_history;
};
