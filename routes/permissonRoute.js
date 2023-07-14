const express = require("express");
const router = express.Router();
const permissonController = require("../controllers/permissonController");
const mdw = require("../middlewares/authMiddleware");

//PERMISSON CONTROLLER
router.post("/permisson/addPermisson", permissonController.createPermissons);
router.post("/permisson/deletPermisson", permissonController.deletePermisson);
// router.patch("/permisson/editPermisson", permissonController.editPermisson);
router.post("/permisson/viewAllPermisson", permissonController.viewAllPermissons);

module.exports = router;