module.exports = {
	findAllBrands: async () => {
		try {
			const dataAllBrands = await db.brand.findAll();
			return dataAllBrands;
		} catch (error) {
			return error;
		}
	},
};
