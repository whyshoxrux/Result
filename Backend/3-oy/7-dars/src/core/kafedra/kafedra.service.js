import { pool } from "../../common/database/database.service.js";
import { createKafedraValidator } from "./kafedra.validator.js";

export async function add(req, res, next) {
  try {
    const newData = req.body;
    const { error } = createKafedraValidator.validate(newData);
    if (error) {
      return res.send(error.details[0].message);
    }
    const result = await pool.query(
      `INSERT INTO kafedra (name) VALUES ($1) RETURNING *`,
      [newData.name]
    );
    res.send(result.rows[0]);
  } catch (err) {
    next();
  }
}

export async function getAll(req, res, next) {
  try {
    const result = await pool.query(`SELECT * FROM kafedra`);
    res.send(result.rows);
  } catch (err) {
    next();
  }
}
export async function get(req, res, next) {
  try {
    const { kafedra_id } = req.params;
    const result = await pool.query(
      `SELECT * FROM kafedra WHERE kafedra_id=$1`,
      [kafedra_id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    next();
  }
}

export async function update(req, res, next) {
  try {
    const { kafedra_id } = req.params;
    const old = await pool.query(
      `
          SELECT * FROM kafedra WHERE kafedra_id = $1
          `,
      [kafedra_id]
    );
    const neww = req.body;
    const { name } = { ...old[0], ...neww };

    const result = await pool.query(
      `
              UPDATE kafedra SET name = $1 WHERE kafedra_id = $2 RETURNING *
              `,
      [name, kafedra_id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    next();
  }
}

export async function deletee(req, res, next) {
  try {
    const { kafedra_id } = req.params;
    const result = await pool.query(
      `DELETE FROM kafedra WHERE kafedra_id = $1`,
      [kafedra_id]
    );
    res.send("O'chirildi🫡");
  } catch (err) {
    next();
  }
}
