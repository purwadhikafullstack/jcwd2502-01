"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class stock extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ product, warehouse, stock_history }) {
			this.belongsTo(product, { foreignKey: "product_id" });
			this.belongsTo(warehouse, { foreignKey: "warehouse_id" });
			this.hasMany(stock_history, { foreignKey: "stock_id" });
		}
	}
	stock.init(
		{
			stocks: DataTypes.INTEGER,
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
			modelName: "stock",
			paranoid: true,
		}
	);
	return stock;
};
