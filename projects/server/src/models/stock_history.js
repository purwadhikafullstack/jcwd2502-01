"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class stock_history extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ stock }) {
			this.belongsTo(stock, { foreignKey: "stock_id" });
		}
	}
	stock_history.init(
		{
			change: DataTypes.STRING,
			stock_before: DataTypes.INTEGER,
			quantity_change: DataTypes.INTEGER,
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
