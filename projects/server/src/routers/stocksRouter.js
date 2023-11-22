const express = require("express");
const Router = express.Router();

//* Import Controller
const { stocksController } = require("../controllers"); // otomatis baca index.js

//* Import Middleware
const upload = require("./../middlewares/upload");
// const { verify } = require("./../lib/jwt");

Router.get("/all", stocksController.getAllProductsStocks);
Router.get("/history", stocksController.getStockHistories);
Router.get("/mutation-in", stocksController.getIncomingMutation);
Router.get("/mutation-out", stocksController.getOutgoingMutation);
Router.get("/specific", stocksController.getSpecificStock);
Router.get("/:stockId", stocksController.getOneStock);
Router.post("/mutation", stocksController.createMutation);
Router.patch("/:stockId", stocksController.updateStock);
Router.patch("/mutation/:mutationId", stocksController.updateMutation);
// Router.delete("/:productId", productsController.deleteProduct);

module.exports = Router; // pake module.exports karena ga ada librarynya, bawaan dari js
