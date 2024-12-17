import { pool } from "../../common/database/database.service.js";
export async function add(req, res) {
  try {
    const newData = req.body;
    const result = await pool.query(
      `
          INSERT INTO category (category_name) 
          VALUES ($1) RETURNING *
          
          `,
      [newData.category_name]
    );
    res.send(result.rows[0]);
  } catch (err) {
    "Error " + err.message;
  }
}
export async function getAll(req, res) {
  try {
    const result = await pool.query(`SELECT * FROM category`);
    res.send(result.rows);
  } catch (err) {
    "Error " + err.message;
  }
}
export async function get(req, res) {
  try {
    const { id } = req.params
    const result = await pool.query(`SELECT * FROM category WHERE id=$1`, [
      category_id,
    ]);
    res.send(result.rows[0]);
  } catch (err) {
    "Error " + err.message;
  }
}
export async function update(req, res) {
  const { id } = req.params;
  try {
    const { category_name } = req.body;

    const result = await pool.query(
      `
           UPDATE category SET category_name = $1 WHERE category_id = $2 RETURNING * 
          `,
      [category_name, id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    "Error " + err.message;
  }
}
export async function deletee(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
          DELETE FROM category WHERE category_id=$1 RETURNING * 
          `,
      [id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    "Error " + err.message;
  }
}
