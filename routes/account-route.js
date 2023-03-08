// Needed Resources
const express = require("express");
const router = new express.Router();
const util = require("../utilities");
const invController = require("../controllers/accountController");
const regValidate = require('../utilities/account-validation')

//Get route for the path that will be sent to my account
router.get("/login", util.isLoggedIn,invController.buildLogin);
router.get("/logout", util.isLoggedIn,invController.logoutClient);
router.get("/register", util.isLoggedIn,invController.buildRegister);
//get to admin
router.get("/", util.checkJWTToken, util.jwtAuth, util.isLoggedIn, invController.buildAdmin)
router.post(
  "/register",
  util.isLoggedIn,
  regValidate.registationRules(),
  regValidate.checkRegData,
  invController.registerClient
);
router.post("/login",
util.isLoggedIn,
invController.loginClient
)

module.exports = router;