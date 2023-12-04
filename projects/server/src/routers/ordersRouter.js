const express = require("express");
const Router = express.Router();

//* Import Controller
const { ordersController } = require("../controllers"); // otomatis baca index.js

//* Import Middleware
const { verifyAdmin, verify } = require("../lib/jwt");

Router.get("/", verify, ordersController.getOrderList);
Router.get("/:receipt_number", verify, ordersController.getOrderDetails);
Router.patch("/complete/:order_id", verify, ordersController.completeOrder);
Router.patch("/cancel/:order_id", verify, ordersController.cancelOrder);

// Admins
Router.get(
	"/admin/order-list",
	verifyAdmin,
	ordersController.adminGetAllUserOrderList
);
Router.post(
	"/admin/confirm-order/:order_id",
	verifyAdmin,
	ordersController.adminConfirmOrder
);
Router.patch(
	"/admin/reject-order/:order_id",
	verifyAdmin,
	ordersController.adminRejectOrder
);
Router.patch(
	"/admin/send-order/:order_id",
	verifyAdmin,
	ordersController.adminSendOrder
);
Router.patch(
	"/admin/cancel-order/:order_id",
	verifyAdmin,
	ordersController.adminCancelOrder
);

module.exports = Router; // pake module.exports karena ga ada librarynya, bawaan dari js
