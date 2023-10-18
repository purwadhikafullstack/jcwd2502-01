const express = require("express");
const Router = express.Router();

//* Import Controller
const { brandsController } = require("../controllers"); // otomatis baca index.js

//* Import Middleware

Router.get("/all", brandsController.getAllBrand);

module.exports = Router; // pake module.exports karena ga ada librarynya, bawaan dari js
