const express = require("express");
const Router = express.Router();

// Import Controller
const { usersController } = require("./../controllers");
const { checkLogin, checkRegister } = require("../middlewares/validator");

Router.post("/register", checkRegister, usersController.register);
// Router.post("/login", checkLogin, usersController.register);

module.exports = Router;
