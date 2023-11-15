const express = require("express");
const Router = express.Router();

//* Import Controller
const { checkoutsController } = require("../controllers"); // otomatis baca index.js

//* Import Middleware
const { uploadPaymentProof } = require("../lib/multer");
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
Router.post("/create-order", verify, checkoutsController.createOrder);
Router.post(
	"/upload-payment/:order_id",
	uploadPaymentProof.single("image"),
	verify,
	checkoutsController.uploadPaymentProof
);

module.exports = Router; // pake module.exports karena ga ada librarynya, bawaan dari js
