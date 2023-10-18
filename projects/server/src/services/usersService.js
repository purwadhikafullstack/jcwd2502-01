const db = require("./../models");
const fs = require("fs").promises;
const handlebars = require("handlebars");
const path = require("path");
const transporter = require("./../helper/transporter");
const { createJWT } = require("./../lib/jwt");
const { hash, match } = require("./../helper/hashing");

module.exports = {
	createUser: async (body) => {
		try {
			const { username, email, password, role } = body;
			const checkUsername = await db.user.findOne({
				where: { username },
			});
			if (checkUsername) return { message: "username already used" };
			// const checkEmail = await db.user.findOne({ where: { email } });
			// if (checkEmail) return { message: "email already used" };
			const hashPassword = await hash(password);
			console.log(hashPassword);
			const registerUser = await db.user.create({
				username,
				email,
				password: hashPassword,
				role,
				status: "inactive",
			});

			const token = createJWT({ id: registerUser.dataValues.id }, "1h");
			const readTemplate = await fs.readFile(
				path.join(__dirname, "../public/index.html"),
				"utf-8"
			);
			const compiledTemplate = await handlebars.compile(readTemplate);
			const newTemplate = compiledTemplate({ username, token });

			await transporter.sendMail({
				from: {
					name: "nexocomp",
					email: "nexocomppurwadhika@gmail.com",
				},
				to: email,
				subject: "Register New Account",
				html: newTemplate,
			});
			return true;
		} catch (error) {
			console.log(error);
			return error;
		}
	},
};
