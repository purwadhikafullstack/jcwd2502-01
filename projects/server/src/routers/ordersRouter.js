const express = require("express");
const Router = express.Router();

//* Import Controller
const { ordersController } = require("../controllers"); // otomatis baca index.js

//* Import Middleware
const { verify } = require("./../lib/jwt");

Router.get("/", verify, ordersController.getOrderList);
Router.get("/:receipt_number", verify, ordersController.getOrderDetails);
Router.patch("/cancel/:order_id", verify, ordersController.cancelOrder);

// Admins
Router.get(
	"/admin/order-list",
	verify,
	ordersController.adminGetAllUserOrderList
);
Router.post(
	"/admin/confirm-order/:order_id",
	// verify,
	ordersController.adminConfirmOrder
);
Router.patch(
	"/admin/reject-order/:order_id",
	verify,
	ordersController.adminRejectOrder
);
Router.patch(
	"/admin/cancel-order/:order_id",
	verify,
	ordersController.adminCancelOrder
);

module.exports = Router; // pake module.exports karena ga ada librarynya, bawaan dari js
