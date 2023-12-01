const db = require("./../models");
const { Op } = require("sequelize");
const { sequelize } = require("./../models");
const fs = require("fs");

module.exports = {
	findAllProducts: async (query) => {
		try {
			const {
				search,
				category,
				brand,
				orderField,
				orderDirection,
				offset,
			} = query;

			const selectedAttributes = [
				"id",
				"product_name",
				"product_desc",
				"product_price",
			];

			const categoryInclude = {
				model: db.category,
				attributes: ["category_type", "id"],
			};

			const brandInclude = {
				model: db.brand,
				attributes: ["brand_name", "id"],
			};

			if (category) {
				const arrayCategory = category.split(",");
				categoryInclude.where = {
					id: {
						[Op.in]: arrayCategory,
					},
				};
			}

			if (brand) {
				const arrayBrand = brand.split(",");
				brandInclude.where = {
					id: {
						[Op.in]: arrayBrand,
					},
				};
			}

			const orderOptions = [];

			if (orderField && orderDirection) {
				orderOptions.push([orderField, orderDirection]);
			}

			const baseQuery = {
				attributes: selectedAttributes,
				include: [
					{
						model: db.product_image,
						attributes: ["image", "id"],
						limit: 1,
					},
					categoryInclude,
					brandInclude,
				],
				limit: 12,
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

			const dataAllProducts = await db.product.findAll(baseQuery);
			const count = await db.product.count({
				where: baseQuery.where,
			});

			return {
				message: "Get products data success",
				data: { count, products: dataAllProducts },
			};
		} catch (error) {
			return error;
		}
	},
	findOneProduct: async (productName) => {
		try {
			const dataProduct = await db.product.findOne({
				attributes: [
					"id",
					"product_name",
					"product_desc",
					"product_price",
					"weight",
				],
				include: [
					{
						model: db.product_image,
						attributes: ["image", "id"],
					},
					{
						model: db.category,
						attributes: ["category_type", "id"],
					},
					{
						model: db.brand,
						attributes: ["brand_name", "id"],
					},
					{
						model: db.stock,
						attributes: ["stocks", "id", "warehouse_id"],
					},
					{
						model: db.specification,
						attributes: {
							exclude: [
								"createdAt",
								"updatedAt",
								"deletedAt",
								"product_id",
							],
						},
					},
				],
				where: { product_name: productName },
			});
			if (!dataProduct) {
				return { isError: true, message: "Product not found" };
			}
			return { message: "Get product's data success", data: dataProduct };
		} catch (error) {
			return error;
		}
	},
	addProduct: async (images, dataProduct, dataSpec) => {
		const t = await sequelize.transaction();
		try {
			if (!dataProduct || !dataSpec) {
				return { message: "Data is not complete", isError: true };
			}
			const { product_name, category_id, brand_id } = dataProduct;
			const { weight } = dataSpec;
			if (!product_name || !category_id || !brand_id || !weight) {
				return {
					isError: true,
					message: `Some of the fields are missing`,
					data: null,
				};
			}
			const checkProduct = await db.product.findOne({
				where: { product_name },
			});

			if (checkProduct) {
				if (images) {
					images.map((image) => {
						fs.unlinkSync(image.path);
					});
				}
				return {
					isError: true,
					message: `${product_name} is already added`,
					data: null,
				};
			}
			const addProduct = await db.product.create(dataProduct, {
				transaction: t,
			});

			const dataImages = [];
			if (images) {
				for (const image of images) {
					dataImages.push({
						image: image.path.substring(4),
						product_id: addProduct.dataValues.id,
					});
				}
				const addProductImages = await db.product_image.bulkCreate(
					dataImages,
					{
						transaction: t,
					}
				);
			}

			const addProductSpec = await db.specification.create(dataSpec, {
				transaction: t,
			});

			const dataWarehouse = await db.warehouse.findAll();
			const dataStock = [];
			dataWarehouse.map((warehouse) => {
				dataStock.push({
					stocks: 0,
					product_id: addProduct.dataValues.id,
					warehouse_id: warehouse.id,
				});
			});
			const addStock = await db.stock.bulkCreate(dataStock, {
				transaction: t,
			});

			await t.commit();
			return { message: "Add product success", data: null };
		} catch (error) {
			await t.rollback();
			return error;
		}
	},
	editProduct: async (
		productId,
		images,
		dataImages,
		dataProduct,
		dataSpec
	) => {
		const t = await sequelize.transaction();
		try {
			if (!dataProduct || !dataSpec) {
				return { message: "Data is not complete", isError: true };
			}
			const checkProduct1 = await db.product.findByPk(productId);
			if (!checkProduct1) {
				if (dataImages.action !== "keep") {
					images.map((image) => {
						fs.unlinkSync(image.path);
					});
				}
				return {
					isError: true,
					message: `Product not found`,
					data: null,
				};
			}
			const { product_name } = dataProduct;
			const checkProduct2 = await db.product.findOne({
				where: { product_name },
			});

			if (checkProduct2 && checkProduct2?.dataValues?.id != productId) {
				if (dataImages.action !== "keep") {
					images.map((image) => {
						fs.unlinkSync(image.path);
					});
				}
				return {
					isError: true,
					message: `${product_name} is already added`,
					data: null,
				};
			}

			const updateProduct = await db.product.update(
				dataProduct,
				{ where: { id: productId } },
				{
					transaction: t,
				}
			);

			if (dataImages.action === "remove") {
				const product_images = await db.product_image.findAll({
					where: { product_id: productId },
				});
				const productPath = [];
				if (product_images.length) {
					product_images.map((image) => {
						productPath.push({
							path: image.dataValues.image,
						});
					});
					await db.product_image.destroy(
						{
							where: { product_id: productId },
						},
						{ transaction: t }
					);
				}
				productPath.map((v) => {
					fs.unlinkSync(__dirname + `/../${v.path}`);
				});
			}
			const updateImages = [];
			if (images && dataImages.action !== "keep") {
				for (const image of images) {
					updateImages.push({
						image: image.path.substring(4),
						product_id: productId,
					});
				}
				const product_images = await db.product_image.findAll({
					where: { product_id: productId },
				});
				const productPath = [];
				if (product_images.length) {
					product_images.map((image) => {
						productPath.push({
							path: image.dataValues.image,
						});
					});
					await db.product_image.destroy(
						{
							where: { product_id: productId },
						},
						{ transaction: t }
					);
				}
				productPath.map((v) => {
					fs.unlinkSync(__dirname + `/../${v.path}`);
				});
				const updateProductImages = await db.product_image.bulkCreate(
					updateImages,
					{
						transaction: t,
					}
				);
			}
			const updateProductSpec = await db.specification.update(
				dataSpec,
				{ where: { product_id: productId } },
				{
					transaction: t,
				}
			);

			await t.commit();
			return { message: "Update product success", data: null };
		} catch (error) {
			if (images.length) {
				images.map((image) => {
					fs.unlinkSync(image.path);
				});
			}
			await t.rollback();
			return error;
		}
	},
	removeProduct: async (productId) => {
		const t = await sequelize.transaction();
		try {
			const dataProduct = await db.product.findByPk(productId);
			if (!dataProduct) {
				return { isError: true, message: "Product not found" };
			}
			await db.product.destroy(
				{
					where: { id: productId },
				},
				{
					transaction: t,
				}
			);
			await db.specification.destroy(
				{
					where: { product_id: productId },
				},
				{
					transaction: t,
				}
			);
			const product_images = await db.product_image.findAll({
				where: { product_id: productId },
			});
			const productPath = [];
			if (product_images.length) {
				product_images.map((image) => {
					productPath.push({
						path: image.dataValues.image,
					});
				});
				await db.product_image.destroy(
					{
						where: { product_id: productId },
					},
					{ transaction: t }
				);
			}
			productPath.map((v) => {
				fs.unlinkSync(__dirname + `/../${v.path}`);
			});

			await t.commit();
			return { message: "Remove product success" };
		} catch (error) {
			await t.rollback();
			return error;
		}
	},
	topSoldProducts: async () => {
		try {
			const categoryInclude = {
				model: db.category,
				attributes: ["category_type", "id"],
			};

			const brandInclude = {
				model: db.brand,
				attributes: ["brand_name", "id"],
			};

			const topSoldProducts = await db.product.findAll({
				attributes: [
					"id",
					"product_name",
					"product_price",
					[
						sequelize.fn(
							"SUM",
							sequelize.col("order_details.quantity")
						),
						"totalSold",
					],
				],
				include: [
					{
						model: db.order_detail,
						attributes: [
							[
								sequelize.fn("SUM", sequelize.col("quantity")),
								"quantity",
							],
						],
						where: {
							quantity: {
								[Op.gt]: 0,
							},
						},
						include: [
							{
								model: db.order,
								attributes: [],
								where: {
									status: {
										[Op.in]: ["4", "5"],
									},
								},
							},
						],
					},
					{
						model: db.product_image,
						attributes: ["image", "id"],
						limit: 1,
					},
					categoryInclude,
					brandInclude,
				],
				order: [
					[
						sequelize.fn(
							"SUM",
							sequelize.col("order_details.quantity")
						),
						"DESC",
					],
				],
				group: ["product.id"],
			});

			const soldTopProduct = topSoldProducts.filter((_, i) => i < 6);

			return {
				data: soldTopProduct,
				message: "Get top sold products success",
			};
		} catch (error) {
			return error;
		}
	},
};
