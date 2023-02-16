const pool = require("../database");

async function getClassifications() {
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name");
}

async function getVehiclesByClassificationId(classificationId){
  try{
    const data = await pool.query(`SELECT * FROM public.inventory 
    AS i JOIN public.classification AS c ON i.classification_id = 
    c.classification_id WHERE i.classification_id = $1`, [classificationId])
    return data.rows;
  } catch (error) {
    console.error('getclassificationbyid error' + error);
  }
}

async function addClassification(classification_name){
  try{
    const sql = `INSERT INTO public.classification (classification_name)
    VALUES ($1)
    RETURNING *`;
    return await pool.query(sql, [classification_name])
  } catch(error){
    console.error('addClassification error ' + error);
  }
}

async function getInventoryById(invId){
  try{
    const data = await pool.query(`SELECT * FROM public.inventory
   WHERE inv_id = $1`, [invId]);
   return data.rows;
  } catch (error){
    console.error('getInventoryById error ' + error);
  }
}

async function addVehicle(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail,
  inv_price, inv_miles, inv_color, classification_id){
    try{
      const sql = `INSERT INTO public.inventory 
      (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail,inv_price, inv_miles, inv_color, classification_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`
      const data = await pool.query(sql, [inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail,inv_price, inv_miles, inv_color, classification_id])
      return data;
    } catch(error){
      console.error('addVehicle error ' + error);
    }
  }

module.exports = { getClassifications, getVehiclesByClassificationId, getInventoryById, addClassification, addVehicle };