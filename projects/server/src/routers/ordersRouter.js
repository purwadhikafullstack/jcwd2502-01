const express = require("express");
const Router = express.Router();

//* Import Controller
const { ordersController } = require("../controllers"); // otomatis baca index.js

//* Import Middleware
const { verify } = require("./../lib/jwt");

Router.get("/", verify, ordersController.getOrderList);
Router.get("/:receipt_number", verify, ordersController.getOrderDetails);

module.exports = Router; // pake module.exports karena ga ada librarynya, bawaan dari js
