const express = require("express");
const router = express.Router();
const providerController = require("../controllers/providerController");
const mdw = require("../middlewares/authMiddleware");

router.post("/provider/addProvider", providerController.addProvider);
router.post("/provider/findAll", providerController.searchProvider);
router.post("/provider/deleteProvider", providerController.deleteProvider);
router.patch("/provider/editProvider/:id", providerController.editProvider);

module.exports = router;