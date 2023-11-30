const jwt = require("jsonwebtoken");
const db = require("./../models");

module.exports = {
	createJWT: (payload, expiry, tokentype) => {
		try {
			let secret;
			if (tokentype == null) secret = process.env.access_secret;
			else if (tokentype === "verified")
				secret = process.env.verified_secret;
			else if (tokentype === "reset") secret = process.env.reset_secret;
			return jwt.sign(payload, secret, {
				expiresIn: expiry,
			});
		} catch (error) {
			next(error);
		}
	},
	verify: (req, res, next) => {
		try {
			console.log(req.token);
			const { authorization, tokentype } = req.headers;

			if (!authorization) throw { message: "token was not found" };
			// const token = authorization && authorization.split(" ")[1];
			let secret = process.env.access_secret;

			if (tokentype === "verified") secret = process.env.verified_secret;
			if (tokentype === "reset") secret = process.env.reset_secret;
			const decodeData = jwt.verify(req.token, secret);
			req.dataToken = decodeData;
			if (decodeData.apiKey == "Approved") {
				next();
			} else {
				throw { message: "User is not approved" };
			}
		} catch (error) {
			next(error);
		}
	},
	verifyAdmin: async (req, res, next) => {
		try {
			const { authorization, tokentype } = req.headers;

			if (!authorization) throw { message: "token was not found" };
			let secret = process.env.access_secret;
			const decodeData = jwt.verify(req.token, secret);
			console.log(decodeData);
			const checkAdmin = await db.user.findByPk(decodeData.id);
			// console.log(checkAdmin.dataValues);
			if (!checkAdmin)
				throw {
					message: "User not Found!",
				};
			if (checkAdmin.role === "user")
				throw {
					message: "User is not authorized!",
				};
			req.idWarehouse = checkAdmin.warehouse_id;
			req.role = checkAdmin.role;
			next();
		} catch (error) {
			next(error);
		}
	},
	verifySuper: async (req, res, next) => {
		try {
			const { authorization, tokentype } = req.headers;

			if (!authorization) throw { message: "token was not found" };
			let secret = process.env.access_secret;
			const decodeData = jwt.verify(req.token, secret);
			console.log(decodeData);
			const checkAdmin = await db.user.findByPk(decodeData.id);
			console.log(checkAdmin.dataValues.role);
			if (!checkAdmin)
				throw {
					message: "User not Found!",
				};
			if (checkAdmin.dataValues.role === "super") {
				next();
			} else {
				console.log("masuk verify super");
				throw {
					message: "User is not authorized!",
				};
			}
		} catch (error) {
			next(error);
		}
	},
};
