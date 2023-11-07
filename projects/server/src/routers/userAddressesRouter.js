const express = require("express");
const Router = express.Router();

//* Import Controller
const { userAddressesController } = require("../controllers"); // otomatis baca index.js

//* Import Middleware
// const upload = require("./../middlewares/upload");
const { verify } = require("./../lib/jwt");

Router.get("/", verify, userAddressesController.getUserAddresses);
Router.get(
	"/:address_id",
	verify,
	userAddressesController.getSelectedUserAddress
);
Router.post("/newAddress", verify, userAddressesController.createNewAddress);

module.exports = Router;
