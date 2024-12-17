import { pool } from "../../common/database/database.service.js";

export async function renderDormitory(req, res) {
  res.render("dormitory", { layout: false });
}
deleteStudentDormitory;
export async function deleteStudentDormitory(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
        DELETE FROM dormitory WHERE id=$1 RETURNING *           
    `,
      [id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.status(500).send("Malumotlarni ochirishda hatolik boldi" + err.message);
  }
}
export async function renderDormitoryList(req, res) {
  try {
    const result = await pool.query(
      `
                SELECT * FROM dormitory;   
            `
    );
    res.render("dormitory-list", { layout: false, dormitoryList: result.rows });
  } catch (err) {
    res.status(500).send("Malumotlarni olishda hatolik boldi" + err.message);
  }
}
export async function createStudentDormitory(req, res) {
  try {
    const newStudent = req.body;
    const result = await pool.query(
      `
                INSERT INTO dormitory (
                    first_name,
                    second_name,
                    group_name,
                    phone,
                    from_place
                ) VALUES
                ( $1, $2, $3, $4, $5 ) RETURNING *
            `,
      [
        newStudent.first_name,
        newStudent.second_name,
        newStudent.group_name,
        newStudent.phone,
        newStudent.from_place,
      ]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.status(500).send("Malumotlarni joylashda hatolik boldi" + err.message);
  }
}
