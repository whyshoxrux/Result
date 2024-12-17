import { pool } from "../../common/database/database.service.js";
import { createIndex_InformationValidator } from "./index_information.validator.js";

export async function add(req, res, next) {
  try {
    const newData = req.body;
    const { error } = createIndex_InformationValidator.validate(newData);
    if (error) {
      return res.send(error.details[0].message);
    }
    const result = await pool.query(
      `INSERT INTO index_information(
            teacher_id, index_form_id, status, rate) VALUES ($1, $2, $3, $4)`,
      [newData.teacher_id, newData.index_form_id, newData.status, newData.rate]
    );
    res.send("Qoshildi");
  } catch (err) {
    next();
  }
}

export async function getAll(req, res, next) {
  try {
    const result = await pool.query(`SELECT * FROM index_information`);
    res.send(result.rows);
  } catch (err) {
    next();
  }
}

export async function get(req, res, next) {
  try {
    const { index_information_id } = req.params;
    const result = await pool.query(
      `SELECT * FROM index_information WHERE index_information_id=$1`,
      [index_information_id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    next();
  }
}

export async function update(req, res, next) {
  try {
    const { index_information_id } = req.params;
    const old = await pool.query(`
          SELECT * FROM index_information WHERE index_information_id = ${index_information_id}
          `);
    const neww = req.body;
    const { teacher_id, index_form_id, status, rate } = { ...old[0], ...neww };

    const result = await pool.query(
      `
              UPDATE index_information SET teacher_id = $1, index_form_id = $2, status = $3, rate = $4 WHERE index_information_id = $5 RETURNING *
              `,
      [teacher_id, index_form_id, status, rate, index_information_id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    next();
  }
}

export async function deletee(req, res, next) {
  try {
    const { index_information_id } = req.params;
    const result = await pool.query(
      `DELETE FROM index_information WHERE index_information_id = ${index_information_id}`
    );
    res.send("O'chirildi🫡");
  } catch (err) {
    next();
  }
}
