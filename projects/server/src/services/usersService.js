const db = require("./../models");
const fs = require("fs").promises;
const handlebars = require("handlebars");
const path = require("path");
const transporter = require("./../helper/transporter");
const { createJWT } = require("./../lib/jwt");
const { hash, match } = require("./../helper/hashing");
const respHandler = require("../utils/respHandler");
const { check } = require("express-validator");
const { log } = require("util");

module.exports = {
	createUser: async (body) => {
		try {
			const { username, email, password } = body;
			const checkUsername = await db.user.findOne({
				where: { username },
			});
			if (checkUsername)
				throw { isError: true, message: "username already used" };
			const checkEmail = await db.user.findOne({ where: { email } });
			if (checkEmail) throw { message: "email already used" };
			const hashPassword = await hash(password);
			console.log(hashPassword);
			const registerUser = await db.user.create({
				username,
				email,
				password: hashPassword,
				role: "user",
				status: "unverified",
				birth_date: null,
				phone: null,
				gender: null,
			});

			const token = createJWT(
				{
					username: registerUser.dataValues.username,
					apiKey: "Approved",
				},
				"1d",
				"verified"
			);
			const readTemplate = await fs.readFile(
				path.join(__dirname, "../public/index.html"),
				"utf-8"
			);
			const compiledTemplate = await handlebars.compile(readTemplate);
			const newTemplate = compiledTemplate({
				port: process.env.DB_PORT_index,
				username,
				token,
				email,
			});

			await transporter.sendMail({
				from: {
					name: "nexocomp",
					email: "nexocomppurwadhika@gmail.com",
				},
				to: "andrean923@gmail.com",
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
			const accessToken = await createJWT(
				{
					id: checkEmail.dataValues.id,
					apiKey: "Approved",
				},
				"365d"
			);
			return {
				isError: false,
				message: "Login successful. Welcome back!",
				data: {
					username: checkEmail.dataValues.username,
					profileUser: checkEmail.dataValues.profile_picture,
					email: checkEmail.dataValues.email,
					role: checkEmail.dataValues.role,
					status: checkEmail.dataValues.status,
					birth_date: checkEmail.dataValues.birth_date,
					phone: checkEmail.dataValues.phone,
					gender: checkEmail.dataValues.gender,
					accessToken: accessToken,
				},
			};
		} catch (error) {
			return error;
		}
	},
	verifyAccessToken: async (dataToken) => {
		try {
			const { id } = dataToken;
			const checkData = await db.user.findOne({ where: { id } });
			if (!checkData)
				throw { isError: true, message: "Account is not exist" };

			return {
				isError: false,
				message: "token still on going!",
				data: {
					username: checkData.dataValues.username,
					profileUser: checkData.dataValues.profile_picture,
					email: checkData.dataValues.email,
					role: checkData.dataValues.role,
					status: checkData.dataValues.status,
					birth_date: checkData.dataValues.birth_date,
					phone: checkData.dataValues.phone,
					gender: checkData.dataValues.gender,
				},
			};
		} catch (error) {
			return error;
		}
	},
	verifyStatusUser: async (dataToken, headers) => {
		try {
			const { username } = dataToken;
			const { password } = headers;
			console.log(username);
			const checkUser = await db.user.findOne({ where: { username } });
			if (!checkUser)
				throw { isError: true, message: "Account is not exist" };
			console.log(checkUser);
			const checkPassword = await match(
				password,
				checkUser.dataValues.password
			);
			if (!checkPassword)
				throw { isError: true, message: "Password is Wrong!" };
			const verifyUser = await db.user.update(
				{ status: "verified" },
				{ where: { id: checkUser.dataValues.id } }
			);
			console.log(verifyUser);
			return {
				isError: false,
				message: "Verification is Success",
			};
		} catch (error) {
			return error;
		}
	},
	requestPassword: async (dataToken) => {
		try {
			const { id } = dataToken;
			console.log(id);
			const checkUser = await db.user.findOne({ where: { id } });
			if (!checkUser)
				throw { isError: true, message: "Account is not found!" };
			console.log(checkUser.dataValues);

			const token = createJWT(
				{
					id: checkUser.dataValues.id,
					apiKey: "Approved",
					tokentype: "reset",
				},
				"1d",
				"reset"
			);
			const readTemplate = await fs.readFile(
				path.join(__dirname, "../public/changePass.html"),
				"utf-8"
			);
			const compiledTemplate = await handlebars.compile(readTemplate);
			const newTemplate = compiledTemplate({
				port: process.env.DB_PORT_changePass,
				username: checkUser.dataValues.username,
				token,
			});

			await transporter.sendMail({
				from: {
					name: "nexocomp",
					email: "nexocomppurwadhika@gmail.com",
				},
				to: checkUser.dataValues.email,
				subject: "Request Change Password",
				html: newTemplate,
			});

			return {
				isError: false,
				message: "Request for password change has been sent.",
			};
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	changePassword: async (dataToken, headers) => {
		try {
			const { id } = dataToken;
			console.log(id);
			const { password, confirmpassword } = headers;
			if (!(password === confirmpassword))
				return {
					isError: true,
					message: "confirm password is not same",
				};
			const checkUser = await db.user.findOne({ where: { id } });
			console.log(checkUser);
			if (!checkUser)
				return { isError: true, message: "Account is not found!" };
			console.log(password);
			const hashPassword = await hash(password);
			console.log(hashPassword);
			const changePass = await db.user.update(
				{
					password: hashPassword,
				},
				{
					where: { id },
				}
			);
			return { isError: false, message: "Change Password is Success" };
		} catch (error) {
			return error;
		}
	},
	updateData: async (dataToken, body) => {
		try {
			const { id } = dataToken;
			const { username, email, birth_date, gender, phone } = body;
			// console.log(id);
			const checkUser = await db.user.findByPk(id);
			console.log(phone);

			if (birth_date) {
				const dateObject = new Date(birth_date);

				const year = dateObject.getFullYear();
				const month = dateObject.getMonth() + 1;
				const day = dateObject.getDate();
				const formattedDate = `${year}-${month
					.toString()
					.padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
				console.log(formattedDate);

				dataSend = {
					username: username || checkUser.dataValues.username,
					email: email || checkUser.dataValues.email,
					birth_date:
						formattedDate || checkUser.dataValues.birth_date,
					gender: gender || checkUser.dataValues.gender,
					phone: phone || checkUser.dataValues.phone,
				};

				const updateDataUser = await db.user.update(dataSend, {
					where: { id },
				});
				console.log(updateDataUser);
				if (!updateDataUser) {
					return { isError: true, message: "Update Data is Failed!" };
				} else {
					return {
						isError: false,
						message: "Update Data is Success!",
					};
				}
			}
			dataSend = {
				username: username || checkUser.dataValues.username,
				email: email || checkUser.dataValues.email,
				birth_date: checkUser.dataValues.birth_date,
				gender: gender || checkUser.dataValues.gender,
				phone: phone || checkUser.dataValues.phone,
			};

			const updateDataUser = await db.user.update(dataSend, {
				where: { id },
			});
			console.log(updateDataUser);
			if (!updateDataUser) {
				return { isError: true, message: "Update Data is Failed!" };
			} else {
				return { isError: false, message: "Update Data is Success!" };
			}
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	getAllData: async () => {
		try {
			const allData = await db.user.findAll({
				attributes: ["profile_picture", "username", "email", "status"],
				where: { role: "user" },
			});
			console.log(allData);
			return {
				message: "success!",
				data: allData,
			};
		} catch (error) {
			console.log(error);
			return error;
		}
	},
};
