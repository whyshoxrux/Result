import { pool } from "../../common/database/database.service.js";
import CustomError from "../../common/exception/custom.error.js";
import {
  idValidator,
  registerValidator,
  udpateValidator,
} from "./publisher.validator.js";

export async function add(req, res, next) {
  try {
    const newUser = req.body;
    const { error } = registerValidator.validate(newUser);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const result = await pool.query(
      `
            INSERT INTO publishers (
                name, address
            ) VALUES ($1, $2) RETURNING *
        `,
      [newUser.name, newUser.address]
    );
    res.send(result.rows[0])
  } catch (error) {
    console.log(error);
    next(error);
  }
}
export async function getAll(req, res) {
  try {
    const result = await pool.query(`SELECT * FROM publishers;`);
    res.status(200).send(result.rows);
  } catch (error) {
    next(error);
  }
}
export async function get(req, res, next) {
  try {
    const { id } = req.params;

    const result = await pool.query(`SELECT * FROM publishers WHERE id=$1`, [id]);
    res.status(200).send(result.rows[0]);
  } catch (error) {
    next(error);
  }
}
export async function update(req, res, next) {
  try {
    const { error: errorParams } = idValidator.validate(req.params);
    if (errorParams) {
      return res.status(400).send(errorParams.details[0].message);
    }
    const { error: errorBody } = udpateValidator.validate(req.body);
    if (errorBody) {
      return res.status(400).send(errorBody.details[0].message);
    }
    const { id } = req.params;
    const old = await pool.query(
      `
        SELECT * FROM publishers WHERE id = $1`,
      [id]
    );
    const newv = req.body;
    const { name, address } = {
      ...old,
      ...newv,
    };
    const result = await pool.query(
      `
        UPDATE publishers SET name = $1, address = $2 WHERE id = $3
    `,
      [name, address, id]
    );
    res.status(200).send(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function deletee(req, res, next) {
  try {
    const { error: errorParams } = idValidator.validate(req.params);
    if (errorParams) {
      return res.status(400).send(errorParams.details[0].message);
    }
    const { id } = req.params;
    const result = await pool.query(
      `DELETE FROM publishers WHERE id = $1 RETURNING *`,
      [id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.status(500).send("error: " + err.message);
  }
}
