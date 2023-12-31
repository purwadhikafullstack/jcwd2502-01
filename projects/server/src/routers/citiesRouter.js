const express = require("express");
const Router = express.Router();

//* Import Controller
const { citiesController } = require("../controllers"); // otomatis baca index.js

//* Import Middleware
// const upload = require("./../middlewares/upload");
// const { verify } = require("./../lib/jwt");

Router.get("/", citiesController.getCities);
Router.get("/:province_id", citiesController.getCityByProvince);

module.exports = Router; // pake module.exports karena ga ada librarynya, bawaan dari js
