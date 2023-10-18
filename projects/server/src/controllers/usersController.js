const db = require("./../models");
const fs = require("fs").promises;
const handlebars = require("handlebars");
const transporter = require("./../helper/transporter");
const { createUser, loginUser } = require("./../services/usersService");
const respHandler = require("./../utils/respHandler");

module.exports = {
	register: async (req, res, next) => {
		try {
			const getUsername = await createUser(req.body);
			if (getUsername.message) {
				respHandler(res, getUsername.message, null, 500, true);
			} else {
				respHandler(res, "Register Successed");
			}
		} catch (error) {
			console.log(error);
			next(error);
		}
	},
	login: async (req, res, next) => {
		try {
			const checkUser = await loginUser(req.body);
			respHandler(
				res,
				checkUser.message,
				checkUser.data,
				checkUser.status,
				checkUser.isError
			);
		} catch (error) {
			console.log(error);
			next(error);
		}
	},
};
