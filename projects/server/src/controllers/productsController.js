const { deleteFiles } = require("../helper/deleteFiles");
const db = require("./../models");
const { sequelize } = require("./../models");
const { Op } = require("sequelize");

const {
	findAllProducts,
	findOneProduct,
} = require("./../services/productsService");

const respHandler = require("../utils/respHandler");

module.exports = {
	getAllProducts: async (req, res, next) => {
		try {
			const data = await findAllProducts(req.query);
			respHandler(res, "Get products data success", data);
		} catch (error) {
			next(error);
		}
	},
	getProduct: async (req, res, next) => {
		try {
			const { productId } = req.params;
			const data = await findOneProduct(productId);
			respHandler(res, "Get product's data success", data);
		} catch (error) {
			next(error);
		}
	},
	createProduct: async (req, res, next) => {
		try {
			const image = req.files.image;
			const data = JSON.parse(req.body.data);

			if (image) {
				data.product_image = image[0].path;
			}

			const createProduct = await db.product.create(data);

			res.status(201).send({
				isError: false,
				message: "Create product success!",
				data: createProduct,
			});
		} catch (error) {
			next(error);
		}
	},
	updateProduct: async (req, res, next) => {
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
