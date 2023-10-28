"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class city extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ province, user_address, warehouse }) {
			this.belongsTo(province, { foreignKey: "province_id" });
			this.hasMany(user_address, { foreignKey: "city_id" });
			this.hasMany(warehouse, { foreignKey: "city_id" });
		}
	}
	city.init(
		{
			type: DataTypes.STRING,
			city_name: DataTypes.STRING,
			postal_code: DataTypes.STRING,
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
			modelName: "city",
			paranoid: true,
		}
	);
	return city;
};
