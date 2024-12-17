import { pool } from "../../common/database/database.service.js";
import CustomError from "../../common/exception/custom.error.js";
import {
  idValidator,
  registerValidator,
} from "./categories.validator.js";

export async function add(req, res) {
  try {
    const newUser = req.body;
    const { error } = registerValidator.validate(newUser);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const result = await pool.query(
      `
            INSERT INTO categories (
                name
            ) VALUES ($1) RETURNING *
        `,
      [newUser.name]
    );
    res.send(result.rows[0])
  } catch (error) {
    console.log(error); 
    res.send("Error: " + error.message)
  }
}
export async function getAll(req, res) {
  try {
    console.log(123)
    const result = await pool.query(`
        SELECT * FROM categories
      `,);
      res.send(result.rows)
  } catch (error) {
    res.send("Error: " + error.message)
  }
}
export async function get(req, res) {
    try {
      const { id } = req.params;
  
      const result = await pool.query(`SELECT * FROM categories WHERE id=$1`, [id]);
      res.status(200).send(result.rows[0]);
    } catch (error) {
      res.send("Error: " + err.message)
    }
  }
  export async function update(req, res, next) {
    try {
        const { id } = req.params;
        const newPublisher = req.body;

        const oldPublisher = await pool.query(
            `
          SELECT * FROM publishers WHERE id=$1
          `,
            [id]
        );
        const updatedPublisher = {
            ...oldPublisher.rows[0],
            ...newPublisher,
        };
        const { name, address } = updatedPublisher;
        const result = await pool.query(
            `
      UPDATE publishers SET name=$1, address=$2 WHERE id=$3 RETURNING *
      `,
            [name, address, id]
        );
        res.send(result.rows[0]);
    } catch (err) {
        next(err);
    }
}


export async function deletee(req, res) {
  try {
    const { error: errorParams } = idValidator.validate(req.params);
    if (errorParams) {
      return res.status(400).send(errorParams.details[0].message);
    }
    const { id } = req.params;
    const result = await pool.query(
      `DELETE FROM categories WHERE id = $1 RETURNING *`,
      [id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.status(500).send("error: " + err.message);
  }
}
