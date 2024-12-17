import { pool } from "../../common/databases/database.service.js";

export async function addDavomat(req, res) {
  try {
    const body = req.body;

    const result = await pool.query(
      `
        INSERT INTO davomat (oy, dars, keldi, student_id) VALUES
        (1$, $2, $3, $4) RETURNING *
        `,
      [body.oy, body.dars, body.keldi, body.student_id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.send("Error inserting davomat data");
  }
}
export async function deleteDavomat(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
            DELETE FROM davomat WHERE id=$1
            `,
      [id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.send("Error deleting davomat data");
  }
}
export async function getDavomat(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
            SELECT * FROM davomat WHERE id=$1
            `,
      [id]
    );
    res.send(result.rows);
  } catch (err) {
    res.send("Error getting davomat data");
  }
}
export async function getAllDavomat(req, res) {
  try {
    const result = await pool.query(`SELECT * FROM davomat`);
    res.send(result.rows);
  } catch (err) {
    res.send("Error getting davomat data");
  }
}
export async function updateDavomat(req, res) {
  try {
    const { id } = req.params;
    const body = req.body;
    const oldData = await pool.query(
      `
            SELECT * FROM davomat WHERE id=$1
            
            
            `,
      [id]
    );
    const updateData = { ...oldData, ...body };
    const result = await pool.query(
      `
            UPDATE davomat SET oy=$1, dars=$2, keldi=$3, student_id=$4 WHERE id=$5 RETURNING *
            
            `,
      [
        updateData.oy,
        updateData.dars,
        updateData.keldi,
        updateData.student_id,
        id,
      ]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.send("Error updating davomat data");
  }
}

export async function join(req, res) {
  try {
    const result = await pool.query(`
            SELECT 
            davomat.oy,
            davomat.dars,
            davomat.keldi,
            davomat.ism,
            davomat.familiya
            FROM
            students
            JOIN
            davomat
            ON
            students.id = davomat.student_id
            
            
            `);
    res.send(result.rows);
  } catch (err) {
    res.send("Error joining tables", err);
  }
}
