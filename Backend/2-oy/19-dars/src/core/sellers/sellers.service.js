import { pool } from "../../common/database/database.service.js";

export async function add(req, res) {
    try {
      const newData = req.body;
      const result = await pool.query(
        `
          INSERT INTO sellers (first_name, second_name, company_name) 
          VALUES ($1, $2, $3) RETURNING *
          
          `,
        [newData.first_name, newData.second_name, newData.company_name]
      );
      res.send(result.rows[0]);
    } catch (err) {
      res.send("Error " + err.message);
    }
  }
  export async function getAll(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM sellers`);
      res.send(result.rows);
    } catch (err) {
      res.send("Error " + err.message);
    }
  }
  export async function get(req, res) {
    try {
      const {id} = req.params;
      const result = await pool.query(`SELECT * FROM sellers WHERE seller_id=$1`, [
        id
      ]);
      res.send(result.rows[0]);
    } catch (err) {
      res.send(res.send("Error " + err.message));
    }
  }
  export async function update(req, res) {
    const { id } = req.params;
    try {
      const oldSeller = await pool.query(`
        SELECT * FROM sellers WHERE seller_id=$1 
        `, [id])
        
      const newSeller = req.body;
      const {first_name, second_name, company_name} = {...oldSeller.rows[0], ...newSeller};
  
      const result = await pool.query(
        `
           UPDATE sellers SET first_name = $1, second_name = $2, company_name = $3 WHERE seller_id = $4 RETURNING * 
          `,
        [first_name, second_name, company_name]
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
          DELETE FROM sellers WHERE seller_id=$1  
          `,
        [id]
      );
      res.send(result.rows[0]);
    } catch (err) {
        console.log(err);
        
      res.send("Error " + err.message);
    }
  }
  