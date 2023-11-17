const express = require("express");
const Router = express.Router();

//* Import Controller
const { brandsController } = require("../controllers"); // otomatis baca index.js

//* Import Middleware

Router.get("/all", brandsController.getAllBrands);
Router.get("/all-products", brandsController.getAllBrandsWithProducts);
Router.post("/", brandsController.addBrand);
Router.delete("/:brandId", brandsController.deleteBrand);
Router.patch("/:brandId", brandsController.updateBrand);
module.exports = Router; // pake module.exports karena ga ada librarynya, bawaan dari js
