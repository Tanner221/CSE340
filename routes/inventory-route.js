// Needed Resources
const express = require("express"); 
const router = new express.Router(); 
const invController = require("../controllers/invController.js");

router.get("/type/:classificationId", invController.buildByClassification);
router.get("/detail/:invId", invController.buildInvView);

module.exports = router;