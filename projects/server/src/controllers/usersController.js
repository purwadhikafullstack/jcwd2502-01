const db = require("./../models");
const fs = require("fs").promises;
const handlebars = require("handlebars");
const transporter = require("./../helper/transporter");
const {
	createUser,
	loginUser,
	verifyAccessToken,
	verifyStatusUser,
} = require("./../services/usersService");
const respHandler = require("./../utils/respHandler");

module.exports = {
	register: async (req, res, next) => {
		try {
			const getUsername = await createUser(req.body);
			if (getUsername.message) {
				respHandler(res, getUsername.message, null, 200, true);
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
				200,
				checkUser.isError
			);
		} catch (error) {
			console.log(error);
			next(error);
		}
	},
	verifyAccess: async (req, res, next) => {
		try {
			const verif = await verifyAccessToken(req.dataToken);
			respHandler(res, verif.message, verif.data, 200, verif.isError);
		} catch (error) {
			console.log(error);
			next(error);
		}
	},
	verifyStatus: async (req, res, next) => {
		try {
			const verif = await verifyStatusUser(req.dataToken, req.headers);
			respHandler(res, verif.message, null, null, verif.isError);
		} catch (error) {
			next(error);
		}
	},
};
