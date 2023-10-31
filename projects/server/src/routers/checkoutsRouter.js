const express = require("express");
const Router = express.Router();

//* Import Controller
const { checkoutsController } = require("../controllers"); // otomatis baca index.js

//* Import Middleware
// const upload = require("./../middlewares/upload");
// const { verify } = require("./../lib/jwt");

Router.post("/cost", checkoutsController.getShipmentCost);

module.exports = Router; // pake module.exports karena ga ada librarynya, bawaan dari js
