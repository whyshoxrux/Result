import { pool } from "../../common/database/database.service.js";

export async function add(req, res, next) {
  try {
    const newData = req.body;
    const result = await pool.query(
      `
                INSERT INTO guides (teacher_id, guide_type, pages_count, taqriz, status, comment) 
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *          
            `,
      [
        newData.teacher_id,
        newData.guide_types_id,
        newData.pages_count,
        newData.taqriz,
        newData.status,
        newData.comment,
      ]
    );
    res.status(200).send(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function getAll(req, res, next) {
  try {
    const result = await pool.query(`SELECT * FROM guides`);
    res.status(200).send(result.rows);
  } catch (err) {
    next(err);
  }
}
