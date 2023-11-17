const db = require("./../models");
const { Op } = require("sequelize");
module.exports = {
	getDataOrders: async (query, idWarehouse, role) => {
		try {
			const {
				warehouse,
				search,
				category,
				brand,
				orderField,
				orderDirection,
				offset,
				month,
				year,
			} = query;

			if (idWarehouse && idWarehouse !== warehouse)
				return {
					isError: true,
					message: "admin not authorized!",
				};

			if (!warehouse && role === "admin") {
				return {
					isError: true,
					message: `Please select warehouse`,
					data: null,
				};
			}

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
					// {
					// 	model: db.stock,
					// 	attributes: ["stocks", "id"],
					// 	where: { warehouse_id: warehouse },
					// },
				],
				order: orderOptions,
			};

			if (search) {
				baseQuery.where = {
					product_name: {
						[Op.like]: `%${search}%`,
					},
				};
			}

			let productIds = [];
			if (search || category || brand) {
				const dataProducts = await db.product.findAll(baseQuery);
				productIds = dataProducts.map((product) => product.id);
			}

			const orderInclude = {
				model: db.order,
				attributes: ["id", "invoice", "status", "warehouse_id"],
				// where: {
				// 	status: "6",
				// },
			};

			if (warehouse) {
				orderInclude.where = {
					// status:"5",
					warehouse_id: warehouse,
				};
			}

			const baseQuery2 = {
				include: [
					orderInclude,
					{
						model: db.product,
						attributes: ["product_name"],
						include: [
							{
								model: db.brand,
								attributes: ["brand_name"],
							},
							{
								model: db.category,
								attributes: ["category_type"],
							},
						],
					},
				],
				where: {
					// month, // createdAt,
					// status: 5,
				},
				limit: 12,
			};

			if (offset) {
				baseQuery2.offset = Number(offset);
			}

			if (productIds.length) {
				baseQuery2.where = {
					// month,
					product_id: productIds,
				};
			}

			const dataOrder = await db.order_detail.findAll(baseQuery2);
			const count = await db.order_detail.count(baseQuery2);
			console.log(dataOrder);
			return {
				message: "Get order_detail data success",
				data: { count, order: dataOrder },
			};

			const data = await db.order.findAll();
			console.log(data);
		} catch (error) {
			return error;
		}
	},
};
