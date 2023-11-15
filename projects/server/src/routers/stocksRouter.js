const express = require("express");
const Router = express.Router();

//* Import Controller
const { stocksController } = require("../controllers"); // otomatis baca index.js

//* Import Middleware
const upload = require("./../middlewares/upload");
// const { verify } = require("./../lib/jwt");

Router.get("/all", stocksController.getAllProductsStocks);
Router.get("/history", stocksController.getStockHistories);
Router.get("/:stockId", stocksController.getOneStock);
// Router.post("/", upload, productsController.createProduct);
Router.patch("/:stockId", stocksController.updateStock);
// Router.delete("/:productId", productsController.deleteProduct);

module.exports = Router; // pake module.exports karena ga ada librarynya, bawaan dari js
