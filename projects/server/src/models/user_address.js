"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class user_address extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ user, order, city, province }) {
			this.belongsTo(user, { foreignKey: "user_id" });
			this.hasMany(order, { foreignKey: "address_id" });
			this.belongsTo(city, { foreignKey: "city_id" });
			this.belongsTo(province, { foreignKey: "province_id" });
		}
	}
	user_address.init(
		{
			address_name: DataTypes.STRING,
			recipient_name: DataTypes.STRING,
			address: DataTypes.STRING,
			latitude: DataTypes.STRING,
			longitude: DataTypes.STRING,
			is_default: DataTypes.BOOLEAN,
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
			modelName: "user_address",
			paranoid: true,
		}
	);
	return user_address;
};
