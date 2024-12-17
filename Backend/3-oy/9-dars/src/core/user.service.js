import { pool } from "../databases/database.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getconfig } from "../common/config/config.service.js";
import nodemailer from "nodemailer";
import emailTasdiqlashJonatish from "../common/service/mail.service.js";

export async function add(req, res, next) {
  try {
    const newData = req.body;
    const dbUser = await findUserByEmail(newData.email);
    if (dbUser) {
      return res.send("Bunday email royxatdan otgan");
    }
    
    const hashedPassword = await bcrypt.hash(newData.password, 10);
    
    const result = await pool.query(
      `
      INSERT INTO users (username, email, password) 
      VALUES
      ($1, $2, $3)
      `,
      newData.username,
      newData.email,
      hashedPassword
    );
    
    const { email } = newData;
    const token = await tokenYasash({ email });
    
    await emailTasdiqlashJonatish(email, token);

    res.send("Tasdiqlash emaili jonatildi");
  } catch (err) {
    console.log(err.message);
  }
}

function tokenYasash(data) {
  return jwt.sign(data, getconfig("JWT_EMAIL_CONFIRMATION_SECRET"), {
    expiresIn: "15m",
  });
}

async function findUserByEmail(email) {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  return result.rows[0];
}

// export async function getAll(req, res) {
//   try {
//     const result = await pool.query(`SELECT * FROM users`);
//     res.send(result.rows);
//   } catch (err) {
//     console.log(err.message);
//   }
// }

// export async function findUserByEmail(email) {
//   const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
//     email,
//   ]);
//   return result.rows[0];
// }

// export async function tekshir(req, res, next) {
//   try {
//     const { id } = req.params;
//     const token = jwt.verify(id, getconfig("JWT_ACCESS_SECRET"));
//     await pool.query(
//       `
//             UPDATE users SET email_status=true WHERE email = $1
//             `,
//       [token.email]
//     );
//     const result = await pool.query(`SELECT * FROM users`);
//     res.send(result.rows[0]);
//   } catch (err) {
//     console.log(err);
//   }
// }
