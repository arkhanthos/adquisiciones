const express = require("express");
const router = express.Router();
const traceController = require("../controllers/traceController");
const mdw = require("../middlewares/authMiddleware");

//TRACE CONTROL
router.post("/trace/assingment", traceController.assignment);
router.post("/trace/reassingment", traceController.reAssignment);
router.post("/trace/searchAssingment", traceController.searchAssignment);
router.post("/trace/seachAllAssingmets", traceController.searchAllAssingments);
router.post("/trace/deleteAll", traceController.deleteAssing);

module.exports = router;