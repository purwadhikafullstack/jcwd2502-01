const db = require("./../models");
const fs = require("fs").promises;
const handlebars = require("handlebars");
const path = require("path");
const transporter = require("./../helper/transporter");
const { createJWT } = require("./../lib/jwt");
const { hash, match } = require("./../helper/hashing");
const respHandler = require("../utils/respHandler");

module.exports = {
	createUser: async (body) => {
		try {
			const { username, email, password } = body;
			const checkUsername = await db.user.findOne({
				where: { username },
			});
			if (checkUsername)
				throw { isError: true, message: "username already used" };
			// const checkEmail = await db.user.findOne({ where: { email } });
			// if (checkEmail) throw { message: "email already used" };
			const hashPassword = await hash(password);
			console.log(hashPassword);
			const registerUser = await db.user.create({
				username,
				email,
				password: hashPassword,
				role: "user",
				status: "inactive",
			});

			const token = createJWT({ id: registerUser.dataValues.id }, "1d");
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
	loginUser: async (body) => {
		try {
			const { email, password } = body;
			const checkEmail = await db.user.findOne({ where: { email } });
			// console.log(checkEmail);
			if (!checkEmail)
				throw {
					isError: true,
					message: "No account associated with this email address.",
				};
			const hashMatch = await match(
				password,
				checkEmail.dataValues.password
			);
			console.log(hashMatch);
			if (!hashMatch)
				throw {
					isError: true,
					message: "Incorrect password. Please try again.",
				};
			const tokenTransaction = await createJWT(
				{
					id: checkEmail.dataValues.id,
					apiKey: "Approved",
				},
				"20m"
			);
			const accessToken = await createJWT(
				{
					username: checkEmail.dataValues.username,
					apiKey: "Approved",
				},
				"30"
			);
			console.log(tokenTransaction);
			console.log(accessToken);
			return {
				isError: false,
				message: "Login successful. Welcome back!",
				data: {
					username: checkEmail.dataValues.username,
					profileUser: checkEmail.dataValues.profile_picture,
					email: checkEmail.dataValues.email,
					role: checkEmail.dataValues.role,
					accessToken: accessToken,
					tokenTransaction: tokenTransaction,
				},
			};
		} catch (error) {
			return error;
		}
	},
};
