const express = require("express");
const Router = express.Router();

// Import Controller
const { usersController } = require("../controllers");
const { checkLogin, checkRegister } = require("../middlewares/validator");
const { verify } = require("./../lib/jwt");

Router.post("/register", checkRegister, usersController.register);
Router.post("/login", checkLogin, usersController.login);
Router.get("/verifyAccess", verify, usersController.verifyAccess);
Router.patch("/verifyStatus", verify, usersController.verifyStatus);

module.exports = Router;
