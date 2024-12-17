import { pool } from "../../common/database/database.service.js";

export async function add(req, res, next) {
  try {
    const newData = req.body;
    const result = await pool.query(
      `INSERT INTO index_forms (
            index_form_name, index_form_number) VALUES($1, $2) RETURNING *
            `,
      [newData.index_form_name, newData.index_form_number]
    );
    res.send(result.rows[0]);
  } catch (err) {
    next()
  }
}

export async function getAll(req, res, next) {
  try {
    const result = await pool.query(`SELECT * FROM index_forms`);
    res.send(result.rows);
  } catch (err) {
    next()
  }
}

export async function get(req, res, next) {
  try {
    const { index_form_id } = req.params;
    const result = await pool.query(`SELECT * FROM index_forms WHERE index_form_id=$1`, [
        index_form_id,
    ]);
    res.send(result.rows[0]);
  } catch (err) {
    next()
  }
}

export async function update(req, res, next) {
  try {
    const { index_form_id } = req.params;

    const old = await pool.query(`
        SELECT * FROM index_forms WHERE index_form_id = ${index_form_id}
        `);
    const neww = req.body;
    const { index_form_name, index_form_number} = { ...old[0], ...neww };

    const result = await pool.query(
      `
            UPDATE index_forms SET index_form_name = $1, index_form_number = $2 WHERE index_form_id = $3 RETURNING *
            `,
      [index_form_name, index_form_number, index_form_id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    next()
  }
}

export async function deletee(req, res, next){
    try{
        const {index_form_id} = req.params
        const result = await pool.query(`DELETE FROM index_forms WHERE index_form_id = ${index_form_id}`)
        res.send("O'chirildi🫡")
    } catch(err){
        next()
    }
}