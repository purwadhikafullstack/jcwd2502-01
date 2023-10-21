const { check, validationResult } = require("express-validator");
const respHandler = require("./../utils/respHandler");

module.exports = {
	checkLogin: async (req, res, next) => {
		try {
			await check("email")
				.notEmpty()
				.withMessage("Username Must be filled!")
				.isEmail()
				.withMessage("Please provide a valid email address.")
				.isLength({ min: 6 })
				.withMessage("Username must be more than 5 characters!")
				.isLength({ max: 20 })
				.withMessage("Username must be less than 21 characters!")
				.run(req);

			await check("password")
				.notEmpty()
				.withMessage("Password Must be filled!")
				.isAlphanumeric()
				.withMessage("Spaces are not allowed.")
				// .isLength({ min: 5 })
				// .withMessage("Password must be more than 5 characters!")
				.isLength({ max: 20 })
				.withMessage("Password must be less than 21 characters!")
				.run(req);
			const valRes = validationResult(req);
			if (valRes.isEmpty()) return next();

			respHandler(res, valRes.errors[0].msg, null, 500, true);
		} catch (error) {
			next(error);
		}
	},
	checkRegister: async (req, res, next) => {
		try {
			await check("username")
				.notEmpty()
				.withMessage("Email Must be filled!")
				.isAlphanumeric()
				.withMessage("Spaces are not allowed.")
				.isLength({ min: 6 })
				.withMessage("Username must be more than 5 characters!")
				.isLength({ max: 20 })
				.withMessage("Username must be less than 21 characters!")
				.run(req);

			await check("email")
				.notEmpty()
				.withMessage("Email Must be filled!")
				.isEmail()
				.withMessage("Please provide a valid email address.")
				.run(req);

			await check("password")
				.notEmpty()
				.withMessage("Password Must be filled!")
				.isAlphanumeric()
				.withMessage("Spaces are not allowed.")
				// .isLength({ min: 6 })
				// .withMessage("Password must be more than 5 characters!")
				.isLength({ max: 20 })
				.withMessage("Password must be less than 21 characters!")
				.run(req);
			const valRes = validationResult(req);
			if (valRes.isEmpty()) return next();

			respHandler(res, valRes.errors[0].msg, null, 500, true);
		} catch (error) {
			next(error);
		}
	},
};
