const invModel = require("../models/inventory-model");
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

invCont.buildManageView = async function (req, res, next) {
  const nav = await utilities.getNav();
  res.render("./inventory/management/inventory-management", {
    title: "Vehicle Management",
    nav,
    message: null
  })
}

invCont.buildClassificationView = async function (req, res, next) {
  const nav = await utilities.getNav();
  res.render("./inventory/management/add-classification", {
    title: "Add Classification",
    nav,
    message: null
  })
}

invCont.buildVehicleView = async function (req, res, next) {
  const nav = await utilities.getNav();
  const dropdown = await utilities.buildClassificationDropdown();
  res.render("./inventory/management/add-vehicle", {
    title: "Add Vehicle",
    nav,
    message: null,
    dropdown
  })
}

invCont.addClassification = async function (req, res, next) {
  const nav = await utilities.getNav()
  const { classificationName } = req.body;
  const response = invModel.addClassification(classificationName);
  if (response) {
    res.status(201).render("./inventory/management/inventory-management", {
      title: "Vehicle Management",
      nav,
      message: `Thank you for adding the classification ${classificationName}`,
      errors: null
    })
  } else {
    res.status(401).render("./inventory/management/add-classification", {
      title: "Add Vehicle",
      nav,
      message: `Sorry the add Classification failed`,
      errors: null

    })
  }
}

invCont.addVehicle = async function (req, res, next) {
  const nav = await utilities.getNav();
  const dropdown = await utilities.buildClassificationDropdown();
  const { inv_make, inv_model, inv_year, inv_description, inv_image,
    inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body;

  //add vehicle to db
  const result = invModel.addVehicle(inv_make, inv_model, inv_year, inv_description, inv_image,
    inv_thumbnail, inv_price, inv_miles, inv_color, classification_id);

  if (result) {
    res.status(201).render("./inventory/management/inventory-management", {
      title: "Vehicle Management",
      nav,
      message: `Thank you for adding the vehicle ${inv_make} ${inv_model}`,
      errors: null,
      dropdown
    })
  } else {
    res.status(401).render("./inventory/management/add-vehicle", {
      title: "Add Vehicle",
      nav,
      message: `Sorry the add vehicle failed`,
      errors: null,
      dropdown
    })
  }
}

  module.exports = invCont;