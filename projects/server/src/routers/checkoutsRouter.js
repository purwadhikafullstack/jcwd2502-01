const express = require("express");
const Router = express.Router();

//* Import Controller
const { checkoutsController } = require("../controllers"); // otomatis baca index.js

//* Import Middleware
const { verify } = require("./../lib/jwt");

Router.get(
	"/selected-products",
	verify,
	checkoutsController.getSelectedCheckoutProducts
);
Router.get(
	"/nearest-warehouse/:user_address_id",
	verify,
	checkoutsController.getNearestWarehouse
);
Router.post("/cost", checkoutsController.getShipmentCost);

module.exports = Router; // pake module.exports karena ga ada librarynya, bawaan dari js
