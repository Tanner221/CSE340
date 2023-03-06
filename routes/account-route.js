// Needed Resources
const express = require("express");
const router = new express.Router();
const util = require("../utilities");
const invController = require("../controllers/accountController");
const regValidate = require('../utilities/account-validation')

//Get route for the path that will be sent to my account
router.get("/login", invController.buildLogin);
router.get("/register", invController.buildRegister);
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  invController.registerClient
);
router.post("/login",
  (req, res) => {
    res.status(200).send('login process')
  }
)

module.exports = router;