const express = require("express");
const Router = express.Router();
const { reportsController } = require("./../controllers/");
const { verifyAdmin } = require("../lib/jwt");

Router.get("/", verifyAdmin, reportsController.getallOrders);
Router.get("/getTransaction", verifyAdmin, reportsController.getTransaction);
Router.get(
	"/getCategory",
	verifyAdmin,
	reportsController.getDataTransactionByCategory
);
Router.get(
	"/getBrand",
	verifyAdmin,
	reportsController.getDataTransactionByBrand
);
module.exports = Router;
