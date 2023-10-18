const db = require("./../models");
const fs = require("fs").promises;
const handlebars = require("handlebars");
const transporter = require("./../helper/transporter");
const { createUser } = require("./../services/usersService");
const respHandler = require("./../utils/respHandler");

module.exports = {
	register: async (req, res, next) => {
		try {
			const { username, email, password, role } = req.body;
			console.log(username);
			const getUsername = await createUser(req.body);
			console.log(getUsername);
			if (getUsername.message) {
				respHandler(res, getUsername.message, true);
			} else {
				respHandler(res, "Register Successed");
			}
			// res.send(getUsername);
		} catch (error) {
			console.log(error);
			next(error);
		}
	},
};
