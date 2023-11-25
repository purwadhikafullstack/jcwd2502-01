const express = require("express");
const Router = express.Router();

//* Import Controller
const { brandsController } = require("../controllers"); // otomatis baca index.js

//* Import Middleware
const { verifyAdmin, verifySuper } = require("../lib/jwt");

Router.get("/all", brandsController.getAllBrands);
Router.get(
	"/all-products",
	verifyAdmin,
	brandsController.getAllBrandsWithProducts
);
Router.post("/", verifySuper, brandsController.addBrand);
Router.delete("/:brandId", verifySuper, brandsController.deleteBrand);
Router.patch("/:brandId", verifySuper, brandsController.updateBrand);
module.exports = Router; // pake module.exports karena ga ada librarynya, bawaan dari js
