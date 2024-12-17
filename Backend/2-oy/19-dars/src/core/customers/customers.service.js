import { pool } from "../../common/database/database.service.js";

export async function add(req, res) {
    try {
      const newData = req.body;
      const result = await pool.query(
        `
          INSERT INTO customers (first_name, second_name) 
          VALUES ($1, $2) RETURNING *
          
          `,
        [newData.first_name, newData.second_name]
      );
      res.send(result.rows[0]);
    } catch (err) {
      "Error " + err.message;
    }
  }
  export async function getAll(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM customers`);
      res.send(result.rows);
    } catch (err) {
      "Error " + err.message;
    }
  }
  export async function get(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM customers WHERE id=$1`, [
        customer_id,
      ]);
      res.send(result.rows[0]);
    } catch (err) {
      "Error " + err.message;
    }
  }
  export async function update(req, res) {
    const { id } = req.params;
    try {
      const oldCustomer = await pool.query(`
          SELECT * FROM customers WHERE customer_id = $1 
          `, [id])
      
      const newCustomer = req.body;
      const {first_name, second_name} = {...oldCustomer.rows[0], ...newCustomer};
      
  
      const result = await pool.query(
        `
           UPDATE customers SET first_name = $1, second_name = $2, WHEREcustomer_id = $5 RETURNING * 
          `,
        [first_name, second_name]
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
          DELETE FROM customers WHERE customer_id=$1  
          `,
        [id]
      );
      res.send(result.rows[0]);
    } catch (err) {
      "Error " + err.message;
    }
  }
  