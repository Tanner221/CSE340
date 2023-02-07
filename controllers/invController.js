const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {};

invCont.buildByClassification = async function (req, res, next) {
  const classificationId = req.params.classificationId;
  let data = await invModel.getVehiclesByClassificationId
    (classificationId)
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification-view", {
    title: className + " vehicles",
    nav,
    message: null,
    data,
  })
}

invCont.buildInvView = async function (req, res, next) {
  const invId = req.params.invId;
  let data = await invModel.getInventoryById(invId);
  let nav = await utilities.getNav();
  res.render("./inventory/inventory-view.ejs", {
    title: `${data[0].inv_make} ${data[0].inv_model}`,
    nav,
    message: null,
    data: data[0],
  })
}

module.exports = invCont;