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
	getAllDataUser,
	getAllDataAdmin,
	createAdmin,
	updateDataAdmin,
	deleteDataAdmin,
	requestPasswordByAdmin,
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
	uploadProfilePicture: async (req, res, next) => {
		try {
			const { id } = req.dataToken;
			const fileImage = req.file;

			await db.user.update(
				{
					profile_picture: `public/profile-pictures/${fileImage.filename}`,
				},
				{ where: { id } }
			);

			respHandler(res, "Upload profile picture success", null, 201);
		} catch (error) {
			next(error);
		}
	},
	getAllUser: async (req, res, next) => {
		try {
			const result = await getAllDataUser(req.query);
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
	getAllAdmin: async (req, res, next) => {
		try {
			const result = await getAllDataAdmin(req.query);
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
	registAdmin: async (req, res, next) => {
		try {
			const getUsername = await createAdmin(req.body);
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
	updateAdminData: async (req, res, next) => {
		try {
			const result = await updateDataAdmin(req.body);
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
	deleteAdminData: async (req, res, next) => {
		try {
			const result = await deleteDataAdmin(req.params);
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
	reqChangePassByAdmin: async (req, res, next) => {
		try {
			const result = await requestPasswordByAdmin(req.params);
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
