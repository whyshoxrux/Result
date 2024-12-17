import { pool } from "../common/databases/database.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getconfig } from "../common/config/config.service.js";
import nodemailer from "nodemailer";

export async function add(req, res, next) {
  try {
    const newData = req.body;
    const hashedPassword = await bcrypt.hash(newData.password, 10);

    const result = await pool.query(
      `INSERT INTO users (username, email, password, email_status) VALUES ($1, $2, $3, $4)`,
      [newData.username, newData.email, hashedPassword, "false"]
    );

    function generateAccesToken(data) {
      return jwt.sign(data, getconfig("JWT_ACCESS_SECRET"), {
        expiresIn: "6h",
      });
    }

    const mailer = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: getconfig("SENDER_EMAIL"),
        pass: getconfig("NODE_GMAIL_PASSWORD"),
      },
    });

    async function emailJonatish() {
      try {
        console.log(getconfig("SENDER_EMAIL"));

        const mailOptions = {
          from: getconfig(`SENDER_EMAIL`),
          to: newData.email,
          subject: "Test habar",
          html: `http://localhost:3000/user/nima/${generateAccesToken({
            email: newData.email,
          })}`,
        }
        console.log(newData.email);

        await mailer.sendMail(mailOptions);
        console.log("SMS jonatildi");
      } catch (err) {
        console.log("Error: " + err.message);
      }
    }
    emailJonatish();
    res.send("Kodiz ishladi");
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
}

export async function getAll(req, res, next) {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.send(result.rows);
  } catch (err) {
    next(err);
  }
}

export async function findUserByEmail(email) {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  return result.rows[0];
}

export async function tekshir(req, res, next) {
  try {
    const { id } = req.params;
    const token = jwt.verify(id, getconfig("JWT_ACCESS_SECRET"));
    await pool.query(
      `
            UPDATE users SET email_status=true WHERE email = $1
            `,
      [token.email]
    );

    const result = await pool.query(`SELECT * FROM users`);
    res.send(result.rows[0]);
  } catch (err) {
    console.log(err);
  }
}
