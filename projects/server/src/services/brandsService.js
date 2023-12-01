const db = require("./../models");
const Sequelize = require("sequelize");

module.exports = {
	findAllBrands: async () => {
		try {
			const dataAllBrands = await db.brand.findAll({
				attributes: ["id", "brand_name"],
			});
			return { message: "Get brands success", data: dataAllBrands };
		} catch (error) {
			return error;
		}
	},

	findAllBrandsWithProducts: async (query) => {
		try {
			const { offset, orderField, orderDirection } = query;

			const orderOptions = [];
			if (orderField && orderDirection) {
				if (orderField === "total_products") {
					orderOptions.push([
						Sequelize.literal("total_products"),
						orderDirection,
					]);
				} else {
					orderOptions.push([orderField, orderDirection]);
				}
			}

			const baseQuery = {
				attributes: [
					"id",
					"brand_name",
					"updatedAt",
					[
						Sequelize.literal(`
						  (SELECT COUNT(*) 
						   FROM products 
						   WHERE products.brand_id = brand.id 
						   AND products.deletedAt IS NULL
						  )`),
						"total_products",
					],
				],
				group: ["brand.id"],
				limit: 12,
				offset: Number(offset) || 0,
				order: orderOptions,
			};

			const dataBrandsWithProducts = await db.brand.findAll(baseQuery);
			const count = await db.brand.count();

			return {
				message: "Get brands success",
				data: { count, brands: dataBrandsWithProducts },
			};
		} catch (error) {
			return error;
		}
	},
	createBrand: async (brandName) => {
		try {
			if (!brandName) {
				return {
					isError: true,
					message: `Data is not complete`,
					data: null,
				};
			}
			const checkBrand = await db.brand.findOne({
				where: { brand_name: brandName },
			});
			if (checkBrand) {
				return {
					isError: true,
					message: `${brandName} brand is already added`,
					data: null,
				};
			}
			const addBrand = await db.brand.create({
				brand_name: brandName,
			});
			return { message: "Add brand success" };
		} catch (error) {
			return error;
		}
	},
	removeBrand: async (brandId) => {
		try {
			const checkBrand = await db.brand.findByPk(brandId);
			if (!checkBrand) {
				return { message: "Brand not found", data: null };
			}
			await db.brand.destroy({
				where: { id: brandId },
			});

			return { message: "Delete brand success", data: null };
		} catch (error) {
			return error;
		}
	},
	editBrand: async (brandId, brandName) => {
		try {
			if (!brandName) {
				return {
					isError: true,
					message: `Data is not complete`,
					data: null,
				};
			}
			const checkBrand = await db.brand.findByPk(brandId);
			if (!checkBrand) {
				return { message: "Brand not found", data: null };
			}
			const checkBrand2 = await db.brand.findOne({
				where: { brand_name: brandName },
			});
			if (checkBrand2 && checkBrand2.dataValues.id != brandId) {
				return {
					isError: true,
					message: `${brandName} brand is already added`,
					data: null,
				};
			}
			const updateBrand = await db.brand.update(
				{ brand_name: brandName },
				{ where: { id: brandId } }
			);
			return { message: "Update brand success", data: null };
		} catch (error) {
			return error;
		}
	},
};
