// Needed Resources
const express = require("express"); 
const router = new express.Router(); 
const invController = require("../controllers/invController");
const Util = require("../utilities");
const VehicleValidate = require("../utilities/vehicle-validation")

router.get("/type/:classificationId", Util.isLoggedIn, invController.buildByClassification);
router.get("/detail/:invId", Util.isLoggedIn, invController.buildInvView);
router.get("/manage", Util.isLoggedIn, invController.buildManageView);
router.get("/addClassification", Util.isLoggedIn, invController.buildClassificationView);
router.get("/addVehicle", Util.isLoggedIn, invController.buildVehicleView);

router.post(
  "/addClassification",
  Util.isLoggedIn,
  VehicleValidate.addClassRules(),
  VehicleValidate.checkClassData,
  invController.addClassification
)
router.post("/addVehicle", Util.isLoggedIn, invController.addVehicle);

module.exports = router;