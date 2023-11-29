const express = require("express");
const Router = express.Router();

//* Import Controller
const { stocksController } = require("../controllers"); // otomatis baca index.js

//* Import Middleware
const upload = require("./../middlewares/upload");
const { verifyAdmin, verifySuper } = require("../lib/jwt");

Router.get("/all", verifyAdmin, stocksController.getAllProductsStocks);
Router.get("/history", verifyAdmin, stocksController.getStockHistories);
Router.get("/mutation-in", verifyAdmin, stocksController.getIncomingMutation);
Router.get("/mutation-out", verifyAdmin, stocksController.getOutgoingMutation);
Router.get("/specific", verifyAdmin, stocksController.getSpecificStock);
Router.get("/:stockId", verifyAdmin, stocksController.getOneStock);
Router.post("/mutation", verifyAdmin, stocksController.createMutation);
Router.patch("/:stockId", verifyAdmin, stocksController.updateStock);
Router.patch(
	"/mutation/:mutationId",
	verifyAdmin,
	stocksController.updateMutation
);
// Router.delete("/:productId", productsController.deleteProduct);

module.exports = Router; // pake module.exports karena ga ada librarynya, bawaan dari js
