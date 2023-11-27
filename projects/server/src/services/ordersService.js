const db = require("./../models");
const Sequelize = require("sequelize");

module.exports = {
	adminCancelOrderService: async (orderId) => {
		try {
			const checkOrder = await db.order.findByPk(orderId);

			if (Number(checkOrder.status) > 3) {
				return {
					isError: true,
					message: "Order can not be canceled anymore",
				};
			}

			if (Number(checkOrder.status) === 3) {
				await db.order.update(
					{ status: 6 },
					{
						where: {
							id: orderId,
						},
					}
				);
				return { message: "Cancel order success" };
			}

			if (
				Number(checkOrder.status) === 1 ||
				Number(checkOrder.status) === 2
			) {
				await db.order.update(
					{ status: 6 },
					{
						where: {
							id: orderId,
						},
					}
				);
				return { message: "Cancel order success" };
			}

			return { message: "Cancel order success" };
		} catch (error) {
			return error;
		}
	},
};
