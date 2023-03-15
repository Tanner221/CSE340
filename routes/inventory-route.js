// Needed Resources
const express = require("express"); 
const router = new express.Router(); 
const invController = require("../controllers/invController");
const util = require("../utilities");
const VehicleValidate = require("../utilities/vehicle-validation")

router.get("/type/:classificationId", invController.buildByClassification);
router.get("/detail/:invId", invController.buildInvView);
router.get("/",util.checkJWTToken, util.jwtAuth, util.checkAdmin, invController.buildManageView);
router.get("/addClassification", util.checkJWTToken, util.jwtAuth, util.checkAdmin, invController.buildClassificationView);
router.get("/addVehicle", util.checkJWTToken, util.jwtAuth, util.checkAdmin, invController.buildVehicleView);

router.post(
  "/addClassification",
  VehicleValidate.addClassRules(),
  VehicleValidate.checkClassData,
  invController.addClassification
)
router.post("/addVehicle", invController.addVehicle);

module.exports = router;