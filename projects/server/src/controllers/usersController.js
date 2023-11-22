const db = require("./../models");
const fs = require("fs").promises;
const handlebars = require("handlebars");
const transporter = require("./../helper/transporter");
const {
	createUser,
	loginUser,
	verifyAccessToken,
	verifyStatusUser,
	requestPassword,
	changePassword,
	updateData,
	getAllData,
} = require("./../services/usersService");
const respHandler = require("./../utils/respHandler");
const e = require("express");

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
			console.log(error);
			next(error);
		}
	},
	requestChangePassword: async (req, res, next) => {
		try {
			const reqPass = await requestPassword(req.dataToken);
			respHandler(res, reqPass.message, null, null, reqPass.isError);
		} catch (error) {
			console.log(error);
			next(error);
		}
	},
	changePasswordUser: async (req, res, next) => {
		try {
			const patchPassword = await changePassword(
				req.dataToken,
				req.headers
			);
			respHandler(
				res,
				patchPassword.message,
				null,
				null,
				patchPassword.isError
			);
		} catch (error) {
			next(error);
		}
	},
	updatePersonalData: async (req, res, next) => {
		try {
			const updateUser = await updateData(req.dataToken, req.body);
			respHandler(
				res,
				updateUser.message,
				null,
				null,
				updateUser.isError
			);
		} catch (error) {
			next(error);
		}
	},
	getAllUser: async (req, res, next) => {
		try {
			const result = await getAllData();
			respHandler(
				res,
				result.message,
				result.data ? result.data : null,
				null,
				result.isError
			);
		} catch (error) {
			next(error);
		}
	},
};
