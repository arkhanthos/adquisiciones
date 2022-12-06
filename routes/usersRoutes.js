const multiparty = require("connect-multiparty");
const mdw = require("../middlewares/authMiddleware");
const UserController = require("../controllers/usersController");
const express = require("express");

const md_upload = multiparty({uploadDir: "uploads/avatar"});
const router = express.Router();


router.post("/users/one", [mdw.asureAuth], UserController.getOne);
router.get("/users/me", [mdw.asureAuth], UserController.getOne);
router.post("/users", [mdw.asureAuth], UserController.getAll);
router.post("/users/create", [mdw.asureAuth, md_upload], UserController.createUser);

module.exports = router;