const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.post("/auth/refreshAT", AuthController.refreshAccessToken);


module.exports = router;