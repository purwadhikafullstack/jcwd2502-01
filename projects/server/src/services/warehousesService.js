const db = require("./../models");
const { Op } = require("sequelize");

module.exports = {
	findAllWarehouses: async (productId) => {
		try {
			const dataWarehouses = await db.warehouse.findAll({
				attributes: ["id", "warehouse_name", "warehouse_location"],
				include: [
					{
						model: db.user,
						attributes: {
							exclude: [
								"createdAt",
								"updatedAt",
								"deletedAt",
								"password",
								"status",
							],
						},
					},
				],
			});
			return dataWarehouses;
		} catch (error) {
			return error;
		}
	},
	addWarehouse: async (data, adminId) => {
		try {
			const createProduct = await db.product.create(data);
			if (adminId) {
				await db.admin.create();
			}
		} catch (error) {
			next(error);
		}
	},
	updateWarehouse: async (req, res, next) => {
		try {
			const { productId } = req.params;

			const image = req.files.image;
			const data = JSON.parse(req.body.data);

			if (image) {
				const dataImage = await db.product.findOne({
					attributes: ["product_image"],
					where: { id: productId },
				});

				data.product_image = image[0].path;

				await deleteFiles({
					image: [
						{
							path: dataImage.dataValues.product_image,
						},
					],
				});
			}

			const updateProduct = await db.product.update(data, {
				where: { id: productId },
			});

			res.status(201).send({
				isError: false,
				message: "Update product success!",
				data: updateProduct,
			});
		} catch (error) {
			next(error);
		}
	},
};
