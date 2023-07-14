const express = require("express");
const router = express.Router();
const taxDocumentController = require("../controllers/taxDocumentController");
const mdw = require("../middlewares/authMiddleware");

router.post("/tax/createTaxDocument", taxDocumentController.createTaxDoc);
router.get("/tax/findTaxDoc", taxDocumentController.findAllDocuments);
router.post("/tax/finFinalUser", [mdw.asureAuth], taxDocumentController.findByFinalUser);
router.post("/tax/deleteTax",[mdw.asureAuth,mdw.adminPermission],taxDocumentController.deleteDoc);
router.post("/tax/findByDocNumber", [mdw.asureAuth], taxDocumentController.findByDocNumber);
router.post("/tax/findBYEmissionDate", [mdw.asureAuth], taxDocumentController.findByEmissionDate);
router.post("/tax/findByDocType", [mdw.asureAuth, mdw.adminPermission] ,taxDocumentController.findByDocType);
router.post("/tax/findBySupplier", [mdw.asureAuth] , taxDocumentController.findBySupplier);
router.post("/tax/findBySeries", [mdw.asureAuth] , taxDocumentController.findBySeries);
router.post("/tax/searchAny", taxDocumentController.searchAny);
router.patch("/tax/actualizar/:id", taxDocumentController.editTaxDoc);
router.post("/tax/searchSelfTax/:id", taxDocumentController.searchSelfTax);

module.exports = router;