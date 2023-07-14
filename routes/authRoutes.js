const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const mdw = require("../middlewares/authMiddleware");

//REGISTER, LOGIN AND USER CONFIG CONTROLS
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.post("/auth/refreshAT", AuthController.refreshAccessToken);
router.get("/auth/view", AuthController.usersView);
router.post("/auth/changeUserStatus",AuthController.changeStatusUser); //[mdw.asureAuth,mdw.adminPermission],
router.post("/auth/findUser" , AuthController.findUser);
router.post("/auth/editUserData/:id", AuthController.changeLoggedUserData)

module.exports = router;   