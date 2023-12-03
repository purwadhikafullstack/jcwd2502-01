const express = require("express");
const Router = express.Router();

// Import Controller
const { usersController } = require("../controllers");
const { checkLogin, checkRegister } = require("../middlewares/validator");
const { uploadProfilePicture } = require("../lib/multer");
const { verify, verifySuper } = require("./../lib/jwt");

Router.post("/register", checkRegister, usersController.register);
Router.post("/login", checkLogin, usersController.login);
Router.get("/verifyAccess", verify, usersController.verifyAccess);
Router.patch("/verifyStatus", verify, usersController.verifyStatus);
Router.get("/reqPass", verify, usersController.requestChangePassword);
Router.patch("/changePass", verify, usersController.changePasswordUser);
Router.patch("/personalData", verify, usersController.updatePersonalData);
Router.post(
	"/upload-pfp",
	uploadProfilePicture.single("image"),
	verify,
	usersController.uploadProfilePicture
);
Router.get("/allDataUser", verifySuper, usersController.getAllUser);
Router.get("/allDataAdmin", verifySuper, usersController.getAllAdmin);
Router.post(
	"/createAdmin",
	verifySuper,
	checkRegister,
	usersController.registAdmin
);
Router.patch("/updateAdminData", verifySuper, usersController.updateAdminData);
Router.delete(
	"/deleteAdminData/:id",
	verifySuper,
	usersController.deleteAdminData
);
Router.get(
	"/reqChangePassByAdmin/:id",
	verifySuper,
	usersController.reqChangePassByAdmin
);

module.exports = Router;
