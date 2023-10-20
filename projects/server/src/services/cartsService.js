const db = require("./../models");
const { Op } = require("sequelize");

module.exports = {
	findAllProductsInCart: async (params) => {
		try {
			const { user_id } = params;

			const categoryInclude = {
				model: db.category,
				attributes: ["category_type", "id"],
			};

			const brandInclude = {
				model: db.brand,
				attributes: ["brand_name", "id"],
			};

			const baseQuery = {
				attributes: ["id", "quantity", "product_id"],
				include: [
					{
						model: db.product,
						attributes: [
							"id",
							"product_name",
							"product_price",
							"brand_id",
							"category_id",
						],
						include: [
							{
								model: db.product_image,
								attributes: ["image", "id"],
								limit: 1,
							},
							categoryInclude,
							brandInclude,
						],
					},
				],
				where: { user_id },
			};

			const dataProductsInCart = await db.cart.findAll(baseQuery);
			const count = await db.cart.count(baseQuery);

			return { count, cart: dataProductsInCart };
		} catch (error) {
			return error;
		}
	},
};
