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
Router.get("/reqPass", verify, usersController.requestChangePassword);
Router.patch("/changePass", verify, usersController.changePasswordUser);
Router.patch("/personalData", verify, usersController.updatePersonalData);
Router.get("/allDataUser", verify, usersController.getAllUser);

module.exports = Router;
