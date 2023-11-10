const db = require("./../models");

const respHandler = require("../utils/respHandler");
const {
	createAddress,
	updateAddress,
	deleteAddress,
	changeMainAddress,
} = require("../services/userAddressService");

module.exports = {
	getUserAddresses: async (req, res, next) => {
		try {
			const { id: user_id } = req.dataToken;

			const user_addresses = await db.user_address.findAll({
				attributes: [
					"id",
					"address_name",
					"recipient_name",
					"address",
					"is_default",
				],
				include: [
					{
						model: db.province,
						attributes: ["id", "province"],
					},
					{
						model: db.city,
						attributes: ["id", "type", "city_name", "postal_code"],
					},
				],
				where: { user_id },
			});

			respHandler(res, "Get all user addresses success", user_addresses);
		} catch (error) {
			console.log(error);
		}
	},
	getSelectedUserAddress: async (req, res, next) => {
		try {
			const { id: user_id } = req.dataToken;
			const { address_id } = req.params;

			const user_address = await db.user_address.findOne({
				attributes: [
					"id",
					"address_name",
					"recipient_name",
					"address",
					"is_default",
				],
				include: [
					{
						model: db.province,
						attributes: ["id", "province"],
					},
					{
						model: db.city,
						attributes: ["id", "type", "city_name", "postal_code"],
					},
				],
				where: { user_id, id: address_id },
			});

			respHandler(res, "Get selected user address success", user_address);
		} catch (error) {
			console.log(error);
		}
	},
	createNewAddress: async (req, res, next) => {
		try {
			const result = await createAddress(req.body, req.dataToken);
			respHandler(res, result.message, null, null, result.isError);
		} catch (error) {
			next(error);
		}
	},
	updateUserAddress: async (req, res, next) => {
		try {
			const result = await updateAddress(req.body, req.dataToken);
			respHandler(res, result.message, null, null, result.isError);
		} catch (error) {
			next(error);
		}
	},
	deleteUserAddress: async (req, res, next) => {
		try {
			const result = await deleteAddress(req.body);
			respHandler(res, result.message, null, null, result.isError);
		} catch (error) {
			next(error);
		}
	},
	mainAddress: async (req, res, next) => {
		try {
			const result = await changeMainAddress(req.body, req.dataToken);
			respHandler(res, result.message, null, null, result.isError);
		} catch (error) {
			next(error);
		}
	},
};

