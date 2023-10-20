"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class order extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ user, user_address, warehouse, order_detail }) {
			this.belongsTo(user, { foreignKey: "user_id" });
			this.belongsTo(user_address, { foreignKey: "address_id" });
			this.belongsTo(warehouse, { foreignKey: "warehouse_id" });
			this.hasMany(order_detail, { foreignKey: "order_id" });
		}
	}
	order.init(
		{
			total_amount: DataTypes.INTEGER,
			total_item: DataTypes.INTEGER,
			proof_of_payment: DataTypes.STRING,
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
			modelName: "order",
			paranoid: true,
		}
	);
	return order;
};
