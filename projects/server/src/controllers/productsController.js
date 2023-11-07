const { deleteFiles } = require("../helper/deleteFiles");
const db = require("./../models");

const {
	findAllProducts,
	findOneProduct,
	addProduct,
} = require("./../services/productsService");

const respHandler = require("../utils/respHandler");

module.exports = {
	getAllProducts: async (req, res, next) => {
		try {
			const result = await findAllProducts(req.query);
			respHandler(
				res,
				result.message,
				result.data,
				result.status,
				result.isError
			);
		} catch (error) {
			next(error);
		}
	},
	getProduct: async (req, res, next) => {
		try {
			let { productName } = req.params;
			const decodedProductName = decodeURIComponent(productName);
			const result = await findOneProduct(decodedProductName);
			respHandler(
				res,
				result.message,
				result.data,
				result.status,
				result.isError
			);
		} catch (error) {
			next(error);
		}
	},
	createProduct: async (req, res, next) => {
		try {
			const images = req.files.images;
			const dataProduct = JSON.parse(req.body.dataProduct);
			const dataSpec = JSON.parse(req.body.dataSpec);
			const result = await addProduct(images, dataProduct, dataSpec);
			respHandler(
				res,
				result.message,
				result.data,
				result.status,
				result.isError
			);
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
