import { pool } from "../../common/database/database.service.js";

export async function insertProject(req, res) {
  try {
    const project = req.body;
    console.log(project);
    const result = await pool.query(
      `
            INSERT INTO projects ( project_name, start_date, end_date )
            VALUES
                ($1, $2, $3) RETURNING *;
            `,
      [project.project_name, project.start_date, project.end_date]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.send("Error inserting project", err);
  }
}

export async function selectProjects(req, res) {
  try {
    const result = await pool.query(
      `
            SELECT project_name FROM projects WHERE EXTRACT(YEAR FROM start_date) = $1
            `,
      [2024]
    );
    res.send(result.rows);
  } catch {
    res.send(err.message);
  }
}

export async function updateProject(req, res) {
  try {
    const oldData = await pool.query(
      `SELECT project_name, start_date, end_date FROM projects WHERE project_id=$1`,
      [3]
    );

    const data = req.body;
    const neww = { ...oldData.rows[0], ...data };
    const result = await pool.query(
      `UPDATE projects SET project_name = $1, start_date = $2, end_date = $3 WHERE project_id=$4 RETURNING *`,
      [neww.project_name, neww.start_date, "2025-01-31", 3]
    );
    res.send(result.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.send("Error updating project");
  }
}

export async function deleteProject(req, res) {
  try {
    const result = await pool.query(
      `
            DELETE FROM projects WHERE EXTRACT(YEAR FROM end_date) = $1 RETURNING *;
            `,
      [2023]
    );
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting projects");
  }
}
