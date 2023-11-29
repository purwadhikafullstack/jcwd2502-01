const express = require("express");
const Router = express.Router();

//* Import Controller
const { productsController } = require("../controllers"); // otomatis baca index.js

//* Import Middleware
const upload = require("./../middlewares/upload");
const { verifyAdmin, verifySuper } = require("../lib/jwt");

Router.get("/all", productsController.getAllProducts);
Router.get("/top", productsController.getTopSoldProduct);
Router.get("/:productName", productsController.getProduct);
Router.post("/", verifySuper, upload, productsController.createProduct);
Router.patch(
	"/:productId",
	verifySuper,
	upload,
	productsController.updateProduct
);
Router.delete("/:productId", verifySuper, productsController.deleteProduct);

module.exports = Router; // pake module.exports karena ga ada librarynya, bawaan dari js
