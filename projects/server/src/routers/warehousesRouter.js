const express = require("express");
const Router = express.Router();

//* Import Controller
const { warehousesController } = require("../controllers"); // otomatis baca index.js

//* Import Middleware
const { verifyAdmin, verifySuper } = require("../lib/jwt");

Router.get(
	"/unassignedWarehouse",
	verifySuper,
	warehousesController.fetchUnassignedWarehouse
);
Router.get("/all", verifyAdmin, warehousesController.getAllWarehouses);
Router.get("/list", verifyAdmin, warehousesController.getWarehouseList);
Router.get(
	"/others/:warehouseId",
	verifyAdmin,
	warehousesController.getOtherWarehouses
);
Router.get("/:warehouseId", verifyAdmin, warehousesController.getWarehouse);
Router.post("/", verifySuper, warehousesController.createWarehouse);
Router.patch("/:warehouseId", verifySuper, warehousesController.editWarehouse);
Router.delete(
	"/:warehouseId",
	verifySuper,
	warehousesController.deleteWarehouse
);
module.exports = Router; // pake module.exports karena ga ada librarynya, bawaan dari js
