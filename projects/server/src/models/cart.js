"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class cart extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ user, product }) {
			this.belongsTo(user, { foreignKey: "user_id" });
			this.belongsTo(product, { foreignKey: "product_id" });
		}
	}
	cart.init(
		{
			quantity: DataTypes.INTEGER,
			status: DataTypes.BOOLEAN,
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
			modelName: "cart",
			paranoid: true,
		}
	);
	return cart;
};
