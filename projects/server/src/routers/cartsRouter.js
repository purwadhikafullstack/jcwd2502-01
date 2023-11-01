const express = require("express");
const Router = express.Router();

//* Import Controller
const { cartsController } = require("../controllers"); // otomatis baca index.js
const { verify } = require("./../lib/jwt");

//* Import Middleware
// const upload = require("./../middlewares/upload");
// const { verify } = require("./../lib/jwt");

Router.get("/getCart", verify, cartsController.getCart);
Router.post("/", verify, cartsController.addToCart);
Router.patch("/:id", cartsController.updateProductCart);
Router.delete("/:id", cartsController.deleteProductCart);

module.exports = Router; // pake module.exports karena ga ada librarynya, bawaan dari js
