const db = require("./../models");

const { findAllProductsInCart } = require("./../services/cartsService");

const respHandler = require("../utils/respHandler");

module.exports = {
	getCart: async (req, res, next) => {
		try {
			const data = await findAllProductsInCart(req.dataToken);

			respHandler(res, "Get products in cart success", data);
		} catch (error) {
			next(error);
		}
	},
	addToCart: async (req, res, next) => {
		try {
			const { product_id, quantity } = req.body;
			const { id } = req.dataToken;

			const [cart, created] = await db.cart.findOrCreate({
				where: { product_id, user_id: id },
				defaults: { quantity },
			});

			if (!created) {
				const updatedQuantity = cart.quantity + quantity;
				await cart.update({ quantity: updatedQuantity });
			}

			respHandler(res, "Post product to cart success", cart);
		} catch (error) {
			next(error);
		}
	},
	updateProductCart: async (req, res, next) => {
		try {
			const { cart_id } = req.params;
			const { id } = req.dataToken;
			const { change } = req.query;

			const getCart = await db.cart.findOne({
				where: { id: cart_id, user_id: id },
			});

			let quantity = Number(getCart.quantity);

			if (change === "add") {
				quantity += 1;
			} else if (change === "subtract") {
				quantity -= 1;
			}

			if (quantity === 0) {
				await db.cart.destroy({ where: { id: cart_id, user_id: id } });

				return respHandler(res, "Delete Cart Success", null);
			}

			await db.cart.update(
				{ quantity },
				{ where: { id: cart_id, user_id: id } }
			);

			respHandler(res, "Update Cart Success", null);
		} catch (error) {
			next(error);
		}
	},
	deleteProductCart: async (req, res, next) => {
		try {
			const { cart_id } = req.params;
			const { id } = req.dataToken;

			const deleteCart = await db.cart.destroy({
				where: { id: cart_id, user_id: id },
			});

			respHandler(res, "Delete Cart Success", deleteCart);
		} catch (error) {
			next(error);
		}
	},
	selectProductCart: async (req, res, next) => {
		try {
			const { type } = req.body;
			const { cart_id } = req.params;
			const { id } = req.dataToken;

			if (type === "checked") {
				await db.cart.update(
					{ status: "checked" },
					{
						where: {
							id: cart_id,
							user_id: id,
						},
					}
				);

				respHandler(res, "Select Cart Success");
			}

			if (type === "unchecked") {
				await db.cart.update(
					{ status: "unchecked" },
					{
						where: {
							id: cart_id,
							user_id: id,
						},
					}
				);

				respHandler(res, "Deselect Cart Success");
			}

			respHandler(res, "Empty command!");
		} catch (error) {
			next(error);
		}
	},
};
