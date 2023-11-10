const express = require("express");
const Router = express.Router();

//* Import Controller
const { categoriesController } = require("../controllers"); // otomatis baca index.js

//* Import Middleware

Router.get("/all", categoriesController.getAllCategories);
Router.get("/all-products", categoriesController.getAllCategoriesWithProducts);
Router.post("/", categoriesController.addCategory);
Router.delete("/:id", categoriesController.deleteCategory);
Router.patch("/:id", categoriesController.updateCategory);

module.exports = Router; // pake module.exports karena ga ada librarynya, bawaan dari js
