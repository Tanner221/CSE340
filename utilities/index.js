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
};

Util.buildInv = function(data){
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

Util.buildDetails = async function (req, res, next){
  let data = await invModel.getInventoryById(req);
  let html = Util.buildInv(data[0]);
  return html;
}
module.exports = Util;