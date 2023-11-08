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

	findAllBrandsWithProducts: async () => {
		try {
			const dataBrandsWithProducts = await db.brand.findAll({
				attributes: ["id", "brand_name"],
				include: [
					{
						model: db.product,
						attributes: [
							[
								Sequelize.fn(
									"COUNT",
									Sequelize.col("product_name")
								),
								"total_products",
							],
						],
					},
				],
				order: [["updatedAt", "DESC"]],
				group: ["brand.id"],
			});

			return {
				message: "Get brands success",
				data: dataBrandsWithProducts,
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
			if (checkBrand2) {
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
