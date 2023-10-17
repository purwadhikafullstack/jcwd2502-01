const db = require("./../models");

module.exports = {
	// findProducts: async ()=>{
	// 	try {
	// 		const selectedAttributes = [
	//             "id",
	//             "product_name",
	//             "product_description",
	//             "product_image",
	//             "product_price",
	//             "product_discount",
	//         ];

	//         const categoryInclude = {
	//             model: db.category,
	//             attributes: ["category_name", "id"],
	//         };

	//         if (category) {
	//             categoryInclude.where = {
	//                 id: category,
	//             };
	//         }

	//         const orderOptions = [];

	//         if (orderField && orderDirection) {
	//             orderOptions.push([orderField, orderDirection]);
	//         }

	//         const baseQuery = {
	//             attributes: selectedAttributes,
	//             include: [categoryInclude],
	//             limit: 10,
	//             order: orderOptions,
	//         };

	//         if (search) {
	//             baseQuery.where = {
	//                 product_name: {
	//                     [Op.like]: `%${search}%`,
	//                 },
	//             };
	//         }

	//         if (offset) {
	//             baseQuery.offset = Number(offset);
	//         }

	//         if (status) {
	//             baseQuery.where = {
	//                 status: status
	//             }
	//         }

	//         if (search && status) {
	//             baseQuery.where = {
	//                 product_name: {
	//                     [Op.like]: `%${search}%`,
	//                 },
	//                 status: status
	//             }
	//         }

	//         const findProducts = await db.product.findAll(baseQuery);
	// 		return findProducts
	// 	} catch (error) {

	// 	}
	// },

	findUsername: async (username) => {
		try {
			return await db.user.findOne({
				where: {
					username,
				},
			});
		} catch (error) {
			return error;
		}
	},

	findUserId: async (id) => {
		try {
			return await db.user.findOne({
				where: {
					id,
				},
			});
		} catch (error) {
			return error;
		}
	},

	findUserEmail: async (email) => {
		try {
			return await db.user.findOne({
				where: { email },
			});
		} catch (error) {
			return error;
		}
	},

	findAllUsers: async () => {
		try {
			return await db.user.findAll();
		} catch (error) {
			return error;
		}
	},

	passwordUpdate: async (hashedPassword, id) => {
		try {
			return await db.user.update(
				{
					password: hashedPassword,
				},
				{
					where: {
						id,
					},
				}
			);
		} catch (error) {
			return error;
		}
	},
};
