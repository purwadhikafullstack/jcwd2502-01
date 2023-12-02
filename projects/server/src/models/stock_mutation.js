"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class stock_mutation extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ product, warehouse, stock_history }) {
			this.belongsTo(product, { foreignKey: "product_id" });
			this.belongsTo(warehouse, {
				as: "warehouse_to",
				foreignKey: "warehouse_id_to",
			});
			this.belongsTo(warehouse, {
				as: "warehouse_from",
				foreignKey: "warehouse_id_from",
			});
		}
	}
	stock_mutation.init(
		{
			quantity: DataTypes.INTEGER,
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
			modelName: "stock_mutation",
			paranoid: true,
		}
	);
	return stock_mutation;
};
