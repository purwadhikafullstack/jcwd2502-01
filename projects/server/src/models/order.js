"use strict";
const { Model } = require("sequelize");
const enumValues = ["1", "2", "3", "4", "5", "6"];
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
			shipping_cost: DataTypes.INTEGER,
			receipt_number: DataTypes.INTEGER,
			invoice: DataTypes.STRING,
			total_item: DataTypes.INTEGER,
			proof_of_payment: DataTypes.STRING,
			status: { type: DataTypes.ENUM, values: enumValues },
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
