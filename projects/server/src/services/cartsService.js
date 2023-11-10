const db = require("./../models");
const Sequelize = require("sequelize");

module.exports = {
	findAllProductsInCart: async (dataToken) => {
		try {
			const { id } = dataToken;

			const categoryInclude = {
				model: db.category,
				attributes: ["category_type", "id"],
			};

			const brandInclude = {
				model: db.brand,
				attributes: ["brand_name", "id"],
			};

			const baseQuery = {
				attributes: [
					"id",
					"status",
					"quantity",
					"product_id",
					[
						Sequelize.fn("SUM", Sequelize.col("stocks")),
						"total_stocks",
					],
				],
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
							{
								model: db.stock,
								attributes: ["stocks", "id", "warehouse_id"],
							},
							categoryInclude,
							brandInclude,
						],
					},
				],
				where: { user_id: id },
				group: ["id"],
			};

			const dataProductsInCart = await db.cart.findAll(baseQuery);

			const count = dataProductsInCart.length;

			const selectedItems = dataProductsInCart
				.filter((cart) => cart.status === true)
				.map((cart) => cart.quantity)
				.reduce((a, b) => a + b, 0);

			const totalPrice = dataProductsInCart
				.filter((cart) => cart.status === true)
				.map((cart) => cart.product.product_price * cart.quantity)
				.reduce((a, b) => a + b, 0);

			return {
				count,
				cart: dataProductsInCart,
				selectedItems,
				totalPrice,
			};
		} catch (error) {
			return error;
		}
	},
};
