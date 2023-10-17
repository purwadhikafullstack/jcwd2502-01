'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ product_image, specification, brand, category }) {
			this.hasMany(product_image, { foreignKey: "product_id" })
			this.hasMany(specification, { foreignKey: "product_id" })
			this.belongsTo(brand, { foreignKey: "brand_id" })
			this.belongsTo(category, { foreignKey: "category_id" })
		}
	}
	product.init({
		product_name: DataTypes.STRING,
		product_desc: DataTypes.TEXT,
		product_price: DataTypes.INTEGER,
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		sequelize,
		modelName: 'product',
	});
	return product;
};