const db = require("./../models");

module.exports = {
	createUser: async (body) => {
		try {
			const { username, email, password, role } = body;
			const checkUsername = await db.user.findOne({
				where: { username },
			});
			if (checkUsername) return { message: "username already used" };
			const checkEmail = await db.user.findOne({ where: { email } });
			if (checkEmail) return { message: "email already used" };
			// return body;
		} catch (error) {
			return error;
		}
	},
};
