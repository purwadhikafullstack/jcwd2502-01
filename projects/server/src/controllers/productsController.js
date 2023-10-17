const { deleteFiles } = require("../helper/deleteFiles");
const db = require("./../models");
const { sequelize } = require("./../models");
const { Op } = require("sequelize");

const {
	findUsername,
	findUserId,
	findUserEmail,
	findAllUsers,
	passwordUpdate,
} = require("./../services/productsService");

module.exports = {
	getAllProducts: async (req, res, next) => {
		try {
			const {
				search,
				category,
				brand,
				orderField,
				orderDirection,
				offset,
				status,
			} = req.query;

			const selectedAttributes = [
				"id",
				"product_name",
				"product_description",
				"product_image",
				"product_price",
				"product_discount",
			];

			const categoryInclude = {
				model: db.category,
				attributes: ["category_name", "id"],
			};

			if (category) {
				categoryInclude.where = {
					id: category,
				};
			}

			const orderOptions = [];

			if (orderField && orderDirection) {
				orderOptions.push([orderField, orderDirection]);
			}

			const baseQuery = {
				attributes: selectedAttributes,
				include: [categoryInclude],
				limit: 10,
				order: orderOptions,
			};

			if (search) {
				baseQuery.where = {
					product_name: {
						[Op.like]: `%${search}%`,
					},
				};
			}

			if (offset) {
				baseQuery.offset = Number(offset);
			}

			if (status) {
				baseQuery.where = {
					status: status,
				};
			}

			if (search && status) {
				baseQuery.where = {
					product_name: {
						[Op.like]: `%${search}%`,
					},
					status: status,
				};
			}

			const findProducts = await db.product.findAll(baseQuery);
			res.status(200).send({
				isError: false,
				message: "Get data success",
				data: findProducts,
			});
		} catch (error) {
			next(error);
		}
	},
	getProduct: async (req, res, next) => {
		try {
			const { productId } = req.params;

			const product = await db.product.findOne({
				where: { id: productId },
			});

			res.status(200).send({
				isError: false,
				message: "Get one product success",
				data: product,
			});
		} catch (error) {
			console.log(error);
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
