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
				addres_name,
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
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	getLatitudeLongitude: async () => {},
};
