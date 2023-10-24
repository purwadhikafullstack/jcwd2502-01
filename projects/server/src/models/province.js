"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class province extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ city }) {
			this.hasMany(city, { foreignKey: "province_id" });
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
