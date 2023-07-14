const express = require("express");
const router = express.Router();
const deliveryOrderController = require("../controllers/deliveryOrderController");
const mdw = require("../middlewares/authMiddleware");

//DELIVERY ORDERS CONTROLS
router.get("/delivery/findAllDeliveryOrders", deliveryOrderController.findAllDeliveryOrders);
router.post("/delivery/createDeloveryOrder", deliveryOrderController.createDeliveryOrder);
router.patch("/delivery/editOrder/:id", deliveryOrderController.editDeliveryOrder);
router.post("/delivery/deleteOrder", deliveryOrderController.deleteOrder);
router.post("/delivery/searchDelivery", deliveryOrderController.searchAnyDelivery);

module.exports = router;