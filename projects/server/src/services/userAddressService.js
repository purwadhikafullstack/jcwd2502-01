const db = require("./../models");
const fetch = require("node-fetch");
const zlib = require("zlib");

const getLatitudeLongitude = async (cityName) => {
	try {
		const response = await fetch(
			`${process.env.OPENCAGE_BASE_URL}q=${cityName},indonesia&key=${process.env.OPENCAGE_API_KEY}`
		);
		const responseJson = await response.json();
		const result = responseJson.results[0];
		const geometry = result.geometry;
		const latitude = geometry.lat;
		const longitude = geometry.lng;
		return { latitude, longitude };
	} catch (error) {
		console.log(error);
		throw error;
	}
};

module.exports = {
	createAddress: async (body, dataToken) => {
		try {
			const { id } = dataToken;
			const {
				recipient_name,
				address,
				address_name,
				city_id,
				province_id,
			} = body;

			console.log(body);
			console.log(id);

			const checkIdCity = await db.city.findOne({
				where: { id: city_id },
			});
			console.log(checkIdCity.dataValues.city_name);
			const { latitude, longitude } = await getLatitudeLongitude(
				checkIdCity.dataValues.city_name
			);
			console.log(latitude, longitude);

			const addAddress = await db.user_address.create({
				address_name: address_name,
				is_default: false,
				recipient_name: recipient_name,
				user_id: id,
				address: address,
				province_id: province_id,
				city_id: city_id,
				latitude: latitude,
				longitude: longitude,
			});
			console.log(addAddress);

			return {
				isError: false,
				message: "Success Added New Address!",
			};
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	updateAddress: async (body, dataToken) => {
		try {
			const { id } = dataToken;
			const {
				id: address_id,
				recipient_name,
				address,
				address_name,
				city_id,
				province_id,
			} = body;
			const checkAddress = await db.user_address.findByPk(address_id);
			if (!checkAddress)
				return { isError: true, message: "Address not found!" };
			console.log(checkAddress.dataValues);

			if (city_id === checkAddress.dataValues.city_id) {
				data = {
					...checkAddress.dataValues,
					...body,
				};
				const updateData = await db.user_address.update(data, {
					where: { id: address_id },
				});
				console.log(updateData);
				if (!updateData)
					return { isError: true, message: "Failed Update Address!" };
			} else {
				const checkIdCity = await db.city.findOne({
					where: { id: city_id },
				});
				const { latitude, longitude } = await getLatitudeLongitude(
					checkIdCity.dataValues.city_name
				);
				body.user_id = id;
				body.latitude = latitude;
				body.longitude = longitude;

				const updateData = await db.user_address.update(body, {
					where: { id: address_id },
				});
				console.log(updateData);

				if (!updateData)
					return { isError: true, message: "Failed Update Address!" };
			}
			return {
				isError: false,
				message: "Success Update Address!",
			};
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	deleteAddress: async (body) => {
		try {
			const { id } = body;
			console.log(id);
			const deleteData = await db.user_address.destroy({ where: { id } });
			if (!deleteData)
				return { isError: true, message: "Failed Delete Address!" };
			return { isError: false, message: "Success Delete Address!" };
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	changeMainAddress: async (body, dataToken) => {
		try {
			const { id } = dataToken;
			const { id: address_id } = body;
			// console.log(id);
			const setAllFalse = await db.user_address.update(
				{
					is_default: false,
				},
				{
					where: {
						user_id: id,
					},
				}
			);
			console.log(setAllFalse);

			const setMainAddress = await db.user_address.update(
				{
					is_default: true,
				},
				{
					where: {
						id: address_id,
						user_id: id,
					},
				}
			);
			if (!setMainAddress)
				return {
					isError: true,
					message: "Change main address is failed!",
				};
			return {
				isError: false,
				message: "Change main address is success!",
			};
		} catch (error) {
			console.log(error);
			return error;
		}
	},
};
