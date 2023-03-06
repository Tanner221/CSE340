const utilities = require("./")
const { body, validationResult } = require("express-validator")
const validate = {};

validate.addClassRules = () => {
  return [
    body("classificationName")
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage("Please provide a new classification name."),
  ];
}

validate.checkClassData = async (req, res, next) => {
  const {classificationName} = req.body;
  let errors = [];
  errors = validationResult(req);
  if(!errors.isEmpty()){
    let nav = await utilities.getNav();
    res.render("../views/inventory/management/add-classification", {
      errors,
      message: null,
      title: "Add Classification",
      nav,
      classificationName
    })
    return;
  }
  next();
}

module.exports = validate;