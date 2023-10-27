const express = require("express");
const Router = express.Router();

//* Import Controller
const { warehousesController } = require("../controllers"); // otomatis baca index.js

//* Import Middleware
// const upload = require("./../middlewares/upload");
// const { verify } = require("./../lib/jwt");

Router.get("/all", warehousesController.getAllWarehouses);
Router.post("/", warehousesController.createWarehouse);
Router.patch("/:id", warehousesController.editWarehouse);
Router.delete("/:id", warehousesController.deleteWarehouse);
module.exports = Router; // pake module.exports karena ga ada librarynya, bawaan dari js
