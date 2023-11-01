"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class province extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ city, user_address, warehouse }) {
			this.hasMany(city, { foreignKey: "province_id" });
			this.hasMany(user_address, { foreignKey: "city_id" });
			this.hasMany(warehouse, { foreignKey: "city_id" });
		}
	}
	province.init(
		{
			province: DataTypes.STRING,
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
			modelName: "province",
			paranoid: true,
		}
	);
	return province;
};
