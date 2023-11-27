const db = require("./../models");
const { Sequelize, Op, literal, fn, col } = require("sequelize");
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

			const currentDate = new Date();
			const defaultYear = currentDate.getFullYear();
			const defaultMonth = currentDate.getMonth() + 1;

			if (idWarehouse && idWarehouse !== warehouse)
				return {
					isError: true,
					message: "admin not authorized!",
				};

			if (!warehouse && role === "admin") {
				return {
					isError: true,
					message: `Please select warehouse!`,
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
				orderOptions.push([db.product, orderField, orderDirection]);
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
				include: [
					{
						model: db.warehouse,
						attributes: ["warehouse_name"],
					},
				],
				// where: {
				// 	status: "6",
				// },
				// order: orderOptions,
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
					// status: "6",
					[Op.and]: Sequelize.literal(
						`MONTH(order.createdAt) = ${
							month || defaultMonth
						} AND YEAR(order.createdAt)= ${year || defaultYear}`
					),
				},
				order: orderOptions,
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
		} catch (error) {
			return error;
		}
	},
	getDataTransaction: async (query, idWarehouse, role) => {
		try {
			const {
				warehouse,
				search,
				orderField,
				orderDirection,
				offset,
				month,
				year,
			} = query;

			if (idWarehouse && idWarehouse !== warehouse) {
				return {
					isError: true,
					message: "Admin is not Authorized!",
				};
			}

			if (!warehouse && role === "admin") {
				return {
					isError: true,
					message: "Please Select Warehouse!",
					data: null,
				};
			}

			const currentDate = new Date();
			const defaultYear = currentDate.getFullYear();
			const defaultMonth = currentDate.getMonth() + 1;

			// const selectedAttributes = ["id", "product_name", "product_price"];

			const orderOptions = [];
			if (orderField && orderDirection) {
				orderOptions.push([orderField, orderDirection]);
			}

			const selectedAttributes = [
				"id",
				"invoice",
				"createdAt",
				"status",
				"total_amount",
				"receipt_number",
			];
			const baseQuery = {
				attributes: selectedAttributes,
				include: [
					{
						model: db.warehouse,
						attributes: ["id", "warehouse_name"],
					},
					{
						model: db.order_detail,
						attributes: ["id", "quantity", "checked_out_price"],
						include: [
							{
								model: db.product,
								attributes: [
									"id",
									"product_name",
									"product_price",
								],
								include: [
									{
										model: db.product_image,
										attributes: ["id", "image"],
										limit: 1,
									},
								],
							},
						],
					},
				],
				where: {
					// status: "6",
					[Op.and]: Sequelize.literal(
						`MONTH(order.createdAt) = ${
							month || defaultMonth
						} AND YEAR(order.createdAt)= ${year || defaultYear}`
					),
				},
				order: orderOptions,
				limit: 15,
			};

			if (warehouse) {
				baseQuery.where.warehouse_id = warehouse;
			}

			if (search) {
				baseQuery.where.invoice = {
					[Op.like]: `%${search}%`,
				};
			}

			if (offset) {
				baseQuery.offset = Number(offset);
			}
			const getOrder = await db.order.findAll(baseQuery);
			const count = await db.order.count();
			return {
				data: { count, order: getOrder },
			};
		} catch (error) {
			return error;
		}
	},
	getDataOrderByCatergory: async (query, idWarehouse, role) => {
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
					message: `Please select warehouse!`,
					data: null,
				};
			}

			const selectedAttributes = ["id", "category_type", "createdAt"];

			const currentDate = new Date();
			const defaultYear = currentDate.getFullYear();
			const defaultMonth = currentDate.getMonth() + 1;
			console.log(defaultMonth);
			const orderOptions = [];
			if (orderField && orderDirection) {
				orderOptions.push([orderField, orderDirection]);
			}

			const baseQuery = {
				//category
				attributes: selectedAttributes,
				order: orderOptions,
			};

			if (search) {
				baseQuery.where = {
					category_type: {
						[Op.like]: `%${search}%`,
					},
				};
			}

			if (offset) {
				baseQuery.offset = Number(offset);
			}

			const getTotalTransaction = {
				attributes: [
					[
						Sequelize.fn("SUM", Sequelize.col("quantity")),
						"total_items",
					],
					// [
					// 	Sequelize.fn(
					// 		"SUM",
					// 		Sequelize.col("quantity") *
					// 			Number(Sequelize.col("checked_out_price"))
					// 	),
					// 	"total_sales",
					// ],
					[Sequelize.literal("order.warehouse_id"), "warehouse_id"],
					[Sequelize.literal("product.category_id"), "category_id"],
				],
				include: [
					{
						model: db.product,
						attributes: [],
					},
					{
						model: db.order,
						attributes: [],
					},
				],
				where: {
					[Op.and]: Sequelize.literal(
						`MONTH(order_detail.createdAt) = ${
							month || defaultMonth
						} AND YEAR(order_detail.createdAt)= ${
							year || defaultYear
						}`
					),
				},
				group: ["product.category_id"],
			};

			if (warehouse) {
				getTotalTransaction.include[1].where = {
					warehouse_id: warehouse,
				};
			}

			const getData = await db.category.findAll(baseQuery);
			const getCountData = await db.category.count(baseQuery);
			const getDataTransaction = await db.order_detail.findAll(
				getTotalTransaction
			);

			const mergedData = getData.map((data) => {
				const transactionData = getDataTransaction.find(
					(transaction) => {
						console.log(
							data.id,
							transaction.dataValues.category_id
						);
						return data.id === transaction.dataValues.category_id;
					}
				);

				return {
					...data.toJSON(),
					total_items: transactionData
						? transactionData.dataValues.total_items
						: 0,
				};
			});

			console.log(mergedData);

			return {
				data: { count: getCountData, dataBrand: mergedData },
			};
		} catch (error) {
			return error;
		}
	},
	getDataOrderByBrand: async (query, idWarehouse, role) => {
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
					message: `Please select warehouse!`,
					data: null,
				};
			}
			const currentDate = new Date();
			const defaultYear = currentDate.getFullYear();
			const defaultMonth = currentDate.getMonth() + 1;
			const selectedAttributes = ["id", "brand_name"];

			const orderOptions = [];
			if (orderField && orderDirection) {
				orderOptions.push([orderField, orderDirection]);
			}

			const baseQuery = {
				attributes: selectedAttributes,
				order: orderOptions,
			};

			if (search) {
				baseQuery.where = {
					brand_name: {
						[Op.like]: `%${search}%`,
					},
				};
			}

			if (offset) {
				baseQuery.offset = Number(offset);
			}

			const getTotalBrand = {
				attributes: [
					[
						Sequelize.fn("SUM", Sequelize.col("quantity")),
						"total_items",
					],
					[Sequelize.literal("product.brand_id"), "brand_id"],
				],
				include: [
					{
						model: db.product,
						attributes: [],
					},
					{
						model: db.order,
						attributes: [],
					},
				],
				where: {
					[Op.and]: Sequelize.literal(
						`MONTH(order_detail.createdAt) = ${
							month || defaultMonth
						} AND YEAR(order_detail.createdAt)= ${
							year || defaultYear
						}`
					),
				},
				group: ["product.brand_id"],
			};

			if (warehouse) {
				getTotalBrand.include[1].where = {
					warehouse_id: warehouse,
				};
			}

			const getBrand = await db.brand.findAll(baseQuery);
			const getCountData = await db.brand.count(baseQuery);
			const getDataTransaction = await db.order_detail.findAll(
				getTotalBrand
			);

			const mergedData = getBrand.map((data) => {
				const transactionData = getDataTransaction.find(
					(transaction) => {
						return data.id === transaction.dataValues.brand_id;
					}
				);

				return {
					...data.toJSON(),
					total_items: transactionData
						? transactionData.dataValues.total_items
						: 0,
				};
			});

			return {
				data: { count: getCountData, dataBrand: mergedData },
			};
		} catch (error) {
			console.log(error);
			return error;
		}
	},
};
