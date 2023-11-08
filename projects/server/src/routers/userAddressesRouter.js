const express = require("express");
const Router = express.Router();

//* Import Controller
const { userAddressesController } = require("../controllers"); // otomatis baca index.js

//* Import Middleware
// const upload = require("./../middlewares/upload");
const { verify } = require("./../lib/jwt");

Router.get("/:user_id", userAddressesController.getUserAddresses);
Router.post("/newAddress", verify, userAddressesController.createNewAddress);
Router.patch(
	"/updateAddress",
	verify,
	userAddressesController.updateUserAddress
);
Router.patch("/mainAddress", verify, userAddressesController.mainAddress);
Router.delete(
	"/deleteAddress",
	verify,
	userAddressesController.deleteUserAddress
);

module.exports = Router; // pake module.exports karena ga ada librarynya, bawaan dari js
