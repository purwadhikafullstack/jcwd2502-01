const db = require("./../models");

module.exports = {
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
