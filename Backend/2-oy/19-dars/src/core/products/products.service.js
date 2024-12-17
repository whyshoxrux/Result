import { pool } from "../../common/database/database.service.js";

export async function add(req, res) {
  try {
    const newData = req.body;
    const result = await pool.query(
      `
        INSERT INTO products (name, unit_price, seller_id, category_id) 
        VALUES ($1, $2, $3, $4) RETURNING *
        
        `,
      [newData.name, newData.unit_price, newData.seller_id, newData.category_id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.send(res.send("Error " + err.message));
  }
}
export async function getAll(req, res) {
  try {
    const result = await pool.query(`
        SELECT
        products.product_id,
        products.name,
        products.unit_price,
        sellers.first_name,
        sellers.second_name,
        sellers.company_name,
        category.category_name
        FROM 
        products
        LEFT JOIN sellers ON products.seller_id = sellers.seller_id
        LEFT JOIN category ON products.category_id = category.category_id
        
        `);
    res.send(result.rows);
  } catch (err) {
    res.send(res.send("Error " + err.message));
  }
}
export async function get(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT products.name,
        products.unit_price,
        sellers.first_name,
        sellers.second_name,
        sellers.company_name,
        category.category_name
         FROM products LEFT JOIN sellers ON products.seller_id = sellers.seller_id
        LEFT JOIN category ON products.category_id = category.category_id 
        WHERE id=$1 `,
      [id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.send("Error " + err.message);
  }
}
export async function update(req, res) {
  const { id } = req.params;
  try {
    const oldProduct = await pool.query(
      `
        SELECT * FROM products WHERE product_id = $1 
        `,
      [id]
    );

    const newProduct = req.body;
    const { name, unit_price, seller_id, category_id } = {
      ...oldProduct.rows[0],
      ...newProduct,
    };

    const result = await pool.query(
      `
         UPDATE products SET name = $1, unit_price = $2, seller_id = $3, category_id = $4 WHERE product_id = $5 RETURNING * 
        `,
      [name, unit_price, seller_id, category_id, product_id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.send("Error " + err.message);
  }
}
export async function deletee(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
        DELETE FROM products WHERE product_id=$1  
        `,
      [id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.send("Error " + err.message);
  }
}
