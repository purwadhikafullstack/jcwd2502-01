const express = require("express");
const Router = express.Router();

//* Import Controller
const { cartsController } = require("../controllers"); // otomatis baca index.js

//* Import Middleware
const { verify } = require("./../lib/jwt");

Router.get("/", verify, cartsController.getCart);
Router.post("/", verify, cartsController.addToCart);
Router.patch("/:cart_id", verify, cartsController.updateProductCart);
Router.patch("/select/:cart_id", verify, cartsController.selectProductCart);
Router.delete("/:cart_id", verify, cartsController.deleteProductCart);

module.exports = Router; // pake module.exports karena ga ada librarynya, bawaan dari js
