// Needed Resources
const express = require("express"); 
const router = new express.Router(); 
const invController = require("../controllers/invController");
const VehicleValidate = require("../utilities/vehicle-validation")

router.get("/type/:classificationId", invController.buildByClassification);
router.get("/detail/:invId", invController.buildInvView);
router.get("/manage", invController.buildManageView);
router.get("/addClassification", invController.buildClassificationView);
router.get("/addVehicle", invController.buildVehicleView);

router.post(
  "/addClassification",
  VehicleValidate.addClassRules(),
  VehicleValidate.checkClassData,
  invController.addClassification
)
router.post("/addVehicle", invController.addVehicle);

module.exports = router;