const express = require("express");
const Router = express.Router();

//* Import Controller
const { productsController } = require("../controllers"); // otomatis baca index.js

//* Import Middleware
const upload = require("./../middlewares/upload");
// const { verify } = require("./../lib/jwt");

Router.get("/all", productsController.getAllProducts);
Router.get("/:productName", productsController.getProduct);
Router.post("/", upload, productsController.createProduct);
Router.patch("/:productId", upload, productsController.updateProduct);

module.exports = Router; // pake module.exports karena ga ada librarynya, bawaan dari js
