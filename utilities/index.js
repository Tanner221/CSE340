const invModel = require("../models/inventory-model")
const Util = {};
const jwt = require("jsonwebtoken")
require("dotenv").config()

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
};

Util.buildInv = function (data) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const miles = data.inv_miles.toLocaleString('en-US');
  const price = formatter.format(data.inv_price);

  let html = `
  <h1>${data.inv_make} ${data.inv_model}</h1>
  <div class="descGrid">
      <img class='no-thumb' src="${data.inv_image}" alt='Image of ${data.inv_model} on CSEmotors.com'/>
      <div class='desc'>
        <p>
          <b>Description:</b>
          ${data.inv_description}
        </p>
        <p>
          <b>Color:</b>
          ${data.inv_color}
        </p>
        <p>Miles: 
          ${miles}
        </p>
        <h2 id='displayPrice'><b>Price:</b> ${price}</h2>
      </div>
  </div>`;
  return html;
}

Util.buildDetails = async function (req, res, next) {
  let data = await invModel.getInventoryById(req);
  let html = Util.buildInv(data[0]);
  return html;
}

/******************************
 * Builds classification dropdown
 *****************************/
Util.buildClassificationDropdown = async function () {
  const classificationQuery = await invModel.getClassifications();
  const classifications = classificationQuery.rows;
  // build html for select/option statement
  let select = "<select name='classification_id' id='classification_id'><option>--Choose one--</option>"
  classifications.forEach((classification) => {
    select += `<option value='${classification.classification_id}'>${classification.classification_name}</option>`;
  })
  select += "</select>";
  return select;
}

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET, function (err) {
    if (err) {
      return res.status(403).redirect("/client/login")
    }
    return next()
  })
}

/* ****************************************
 *  Authorize JWT Token
 * ************************************ */
Util.jwtAuth = (req, res, next) => {
  const token = req.cookies.jwt
  try {
    const clientData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.clientData = clientData
    next()
  } catch (error) {
    res.clearCookie("jwt", { httpOnly: true })
    return res.status(403).redirect("/")
  }
}

Util.isLoggedIn = (req, res, next) => {
  if(req.cookies.jwt){
    try{
      const token = req.cookies.jwt;
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      res.locals.isLoggedIn = true;
    }
    catch (error) {
      res.clearCookie("jwt", { httpOnly: true})
      res.locals.isLoggedIn = false;
    }
  }
  else{
    res.locals.isLoggedIn = false;
  }
  next();
}

Util.checkAdmin = (req, res, next) => {
  if (req.clientData.client_type != "Employee" && req.clientData.client_type != "Admin"){
    return res.status(403).redirect("/client/login");
  }
  next();
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util;
