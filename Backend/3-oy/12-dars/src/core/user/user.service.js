import getConfig from "../../common/config/config.service.js";
import { pool } from "../../common/database/database.service.js";
import jwt from 'jsonwebtoken'
export async function renderRegister(req, res){
  res.render("register", {layout: false})
}

export async function renderLogin(req, res){
  res.render("login-list", {layout: false})
}

export async function registerUser(req, res) {
  try {
    console.log("registerUser post", req.body);
    const newStudent = req.body;
    const result = await pool.query(
      `
            INSERT INTO users (
                username,
                email,
                password
            ) VALUES
            ( $1, $2, $3 ) RETURNING *
        `,
      [
        newStudent.username,
        newStudent.email,
        newStudent.password
      ]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.status(500).send("Malumotlarni joylashda hatolik boldi" + err.message);
  }
}


export async function loginUser(req, res) {
  try {
      console.log(12);
      
      const { email, password } = req.body;
      const dbUser = await findUserByEmail(email);

      if (!dbUser) {
          return res.status(404).send("Bunday email royhatdan otmagan");
      }
      const token = kalitYasash({ email });
      console.log({ token });
      
      res.status(200).send({ token });
  } catch (err) {
      res.status(500).send("Hatolik boldi" + err.message);
  }
}

export async function renderLoginList(req, res) {
  try {
    const result = await pool.query(
      `
                SELECT * FROM users;   
            `
    );
    res.render("login-list", { layout: false, loginList: result.rows });
  } catch (err) {
    res.status(500).send("Malumotlarni olishda hatolik boldi" + err.message);
  }
}






export async function findUserByEmail(email) {
  const result = await pool.query(
      `
              SELECT * FROM users WHERE email=$1
          `,
      [email]
  );
  return result.rows[0];
}

function kalitYasash(data) {
  return jwt.sign(data, getConfig("JWT_SECRET"), { expiresIn: "1d" });
}
