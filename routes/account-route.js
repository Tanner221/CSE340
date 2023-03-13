// Needed Resources
const express = require("express");
const router = new express.Router();
const util = require("../utilities");
const accountController = require("../controllers/accountController");
const regValidate = require('../utilities/account-validation')

//Get route for the path that will be sent to my account
router.get("/login", accountController.buildLogin);
router.get("/logout", accountController.logoutClient);
router.get("/register", accountController.buildRegister);
//get to admin
router.get("/", util.checkJWTToken, util.jwtAuth, accountController.buildAdmin)
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  accountController.registerClient
);
router.post("/login",
accountController.loginClient
)

module.exports = router;