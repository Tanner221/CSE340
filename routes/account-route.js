// Needed Resources
const express = require("express"); 
const router = new express.Router(); 
const util = require("../utilities");
const invController = require("../controllers/accountController");

//Get route for the path that will be sent to my account
router.get("/login", invController.buildLogin);
router.get("/register", invController.buildRegister);
router.post("/register", invController.registerClient);

module.exports = router;