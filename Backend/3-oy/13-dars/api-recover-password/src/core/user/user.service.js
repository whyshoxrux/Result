import { pool } from "../../common/database/database.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getConfig from "../../common/config/config.service.js";

export async function renderRegister(req, res) {
  res.render("register", { layout: false });
}
export async function renderLogin(req, res) {
  res.render("login", { layout: false });
}
export async function loginUser(req, res) {
  try {
    const user = req.body;

    const dbUser = await findUserByEmail(user.email);
    if (!dbUser) {
      return res.send("Bunday email royhatdasn otmagan");
    }

    const checkPassword = await bcrypt.compare(user.password, dbUser.password);

    if (!checkPassword) {
      return res.send("email yoki parolda hatolik");
    }
    const token = await kalitYasash({ email: dbUser.email });
    res.cookie("token", token);
    res.redirect("/student/dormitory-list");
  } catch (err) {
    res.status(500).send("login qilishda hatolik boldi" + err.message);
  }
}

export function kalitYasash(data) {
  return jwt.sign(data, getConfig("JWT_SECRET"), { expiresIn: "1h" });
}
async function findUserByEmail(email) {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email]
  );
  return result.rows[0];
}
export async function registerUser(req, res) {
  try {
    const newUser = req.body;
    console.log("registerUser post", req.body);
    const dbUser = await findUserByEmail(newUser.email);
    if (dbUser) {
      return res.send("Bunday email oldin royhatdan otgan");
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    const result = await pool.query(
      `
      INSERT INTO users (
        first_name,
        second_name,
        email,
        password
        ) VALUES
        ( $1, $2, $3, $4 ) RETURNING *
        `,
      [newUser.first_name, newUser.second_name, newUser.email, hashedPassword]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.status(500).send("Malumotlarni joylashda hatolik boldi" + err.message);
  }
}

export async function recovery(req, res) {
  try {
    const { token } = req.params;

    const newEmail = jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error("Token verify qilishda xatolik:", err);
      } else {
        const email = decoded.email;
        console.log("Email:", email);
      }
    });

    const oldData = await pool.query(
      ` 
        SELECT * FROM users WHERE email = $1`,
      [email]
    );
    const newData = req.body;
    const { password } = {
      ...oldData.rows[0],
      ...newData,
    };
    const result = await pool.query(
      `
      UPDATE users SET password = $1 WHERE email = $2 RETURNING *`,
      [password, newEmail]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.send("Error: " + err.message);
  }
}

export async function resetPassword(req, res) {
  res.render("login", { layout: false });
}

export async function renderRecovery(req, res) {
  try {
    const token = req.parasm.token;

    const n = jwt.verify(token, getConfig("JWT_ACCCES_SECRET"));
    console.log(n);

    if (n) {
      return res.render("newPassword", { layout: false });
    }
  } catch (err) {
    console.log(err.message);
    res.send("Kalit xato");
  }
}
