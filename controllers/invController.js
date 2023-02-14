const invModel = require("../models/inventory-model");
const Util = require("../utilities");
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
  let data = await utilities.buildDetails(invId);
  let titleInfo = await invModel.getInventoryById(invId);
  let nav = await utilities.getNav();
  res.render("./inventory/inventory-view.ejs", {
    title: `${titleInfo[0].inv_make} ${titleInfo[0].inv_model}`,
    nav,
    message: null,
    data: data,
  })
}

module.exports = invCont;