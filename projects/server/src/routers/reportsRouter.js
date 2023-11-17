const express = require("express");
const Router = express.Router();
const { reportsController } = require("./../controllers/");
const { verifyAdmin } = require("../lib/jwt");

Router.get("/", verifyAdmin, reportsController.getallOrders);
module.exports = Router;
