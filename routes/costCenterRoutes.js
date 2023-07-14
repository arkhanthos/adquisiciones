const express = require("express");
const router = express.Router();
const costCenterController = require("../controllers/costCenterController");
const mdw = require("../middlewares/authMiddleware");

//COST CENTER CONTROLLER
router.post("/costcenter/addCostCenter", costCenterController.addCostCenter);
// router.get("/costcenter/findCostCenter", (req, res) =>{
//     res.json('Listado de los centros de costo');
// });
router.get("/costCenter/nuevo", (req, res) => {
    res.json(['Respuesta']);
});
router.post("/costcenter/findCostCenter", costCenterController.searchCostCenter);
router.post("/costcenter/deleteCostCenter", costCenterController.deleteCostCenter);

module.exports = router;