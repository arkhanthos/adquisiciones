const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addresController");
const mdw = require("../middlewares/authMiddleware");

//ADDRESS CONTROLS
router.post("/address/addStore", addressController.createAddress);
router.post("/address/findAllStores", addressController.findAllStores);
router.post("/address/deleteStore", addressController.deleteStore);
router.patch("/address/editStore/:id", addressController.editStore);

module.exports = router;