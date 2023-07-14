const express = require("express");
const router = express.Router();
const request = require("../controllers/requestController");
const mdw = require("../middlewares/authMiddleware");

router.post("/request/create", request.createRequest);
router.post("/request/deleteRequest", request.deleteRequest);
router.patch("/request/updateRequest/:id", request.updateRequest);
// router.post("/request/searchRequest", request.findRequest);
router.post("/request/findById", request.findByRequestId);
router.post("/request/findAllRequest", request.findAll);
router.post("/request/deleteAll", request.deleteAllRequest);

module.exports = router;