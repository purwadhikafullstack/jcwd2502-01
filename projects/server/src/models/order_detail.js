"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class order_detail extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ order, product }) {
			this.belongsTo(order, { foreignKey: "order_id" });
			this.belongsTo(product, { foreignKey: "product_id" });
		}
	}
	order_detail.init(
		{
			quantity: DataTypes.INTEGER,
			checked_out_price: DataTypes.INTEGER,
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
			modelName: "order_detail",
			paranoid: true,
		}
	);
	return order_detail;
};
