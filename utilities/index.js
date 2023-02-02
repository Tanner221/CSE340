const invModel = require("../models/inventory-model")
const Util = {};

/*****************
 * Constructs the nav HTML unorderd list
 ****************/
Util.buildNav = function (data) {
  let list = "<ul>";
  list += '<li class="nav-list"><a class="nav-element" href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += "<li>";
    list += '<a class="nav-element" href="/inv/type/' +
      row.classification_id + 
      '" title="see our inventory of ' +
      row.classification_name +
      ' vehicles">' + 
      row.classification_name +
      "</a>";
      list += "</li>";
  })
  list += "</ul>";
  return list;
}

/******************
 * Builds the navigation Bar
 ******************/
//this builds the site nav
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  nav = Util.buildNav(data);
  return nav;
}

module.exports = Util;