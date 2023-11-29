const express = require("express");
const Router = express.Router();

//* Import Controller
const { categoriesController } = require("../controllers"); // otomatis baca index.js

//* Import Middleware
const { verifyAdmin, verifySuper } = require("../lib/jwt");

Router.get("/all", categoriesController.getAllCategories);
Router.get(
	"/all-products",
	verifyAdmin,
	categoriesController.getAllCategoriesWithProducts
);
Router.post("/", verifySuper, categoriesController.addCategory);
Router.delete("/:categoryId", verifySuper, categoriesController.deleteCategory);
Router.patch("/:categoryId", verifySuper, categoriesController.updateCategory);

module.exports = Router; // pake module.exports karena ga ada librarynya, bawaan dari js
