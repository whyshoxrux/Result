import { pool } from "../../common/database/database.service.js";

export async function add(req, res) {
    try {
      const newData = req.body;
      const result = await pool.query(
        `
          INSERT INTO orders (customer_id, product_id) 
          VALUES ($1, $2) RETURNING *
          
          `,
        [newData.customer_id, newData.product_id]
      );
      res.send(result.rows[0]);
    } catch (err) {
      res.send("Error " + err.message)
    }
  }
  export async function getAll(req, res) {
    try {
      const result = await pool.query(`SELECT 
        orders.order_id,
        customers.first_name,
        customers.second_name,
        products.name,
        products.unit_price,
        category.category_name
        FROM orders
        LEFT JOIN products ON orders.product_id = products.product_id
        LEFT JOIN category ON products.category_id = category.category_id
        LEFT JOIN customers ON orders.customer_id = customers.customer_id
        
        `);
      res.send(result.rows);
    } catch (err) {
      res.send("Error " + err.message);
    }
  }
  export async function get(req, res) {
    try {
        const {id} = req.params;
      const result = await pool.query(`SELECT * FROM orders WHERE id=$1`, [
        id,
      ]);
      res.send(result.rows[0]);
    } catch (err) {
      "Error " + err.message;
    }
  }
  export async function update(req, res) {
    const { id } = req.params;
    try {
      const oldorder = await pool.query(`
          SELECT * FROM orders WHERE order_id = $1 
          `, [id])
      
      const neworder = req.body;
      const {customer_id, product_id} = {...oldorder.rows[0], ...neworder};
      
  
      const result = await pool.query(
        `
           UPDATE orders SET customer_id = $1, product_id = $2, WHERE order_id = $3 RETURNING * 
          `,
        [customer_id, product_id]
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
          DELETE FROM orders WHERE order_id=$1  
          `,
        [id]
      );
      res.send(result.rows[0]);
    } catch (err) {
      "Error " + err.message;
    }
  }
  