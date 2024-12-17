import getConfig from "../common/config/config.service.js";
import { pool } from "../common/database/database.service.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export async function renderUser(req, res) {
  res.render("user-register", { layout: false });
}

export async function addUser(req, res) {
  try {
    const newData = req.body;
    const dbUser = await findUserByEmail(newData.email);
    if (dbUser) {
     return res.send("Bunday email oldin royxatdan o'tgan");
    }

    console.log(newData);
    const hashedPassword = await bcrypt.hash(newData.password, 10);
    
    const result = await pool.query(
      `
            INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING *
            `,
      [newData.username, newData.email, hashedPassword]
    );
    res.send(result.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
}

export async function renderLoginUser(req, res) {
  res.render("user-login", { layout: false });
}






export async function loginUser(req, res) {
  try {
    const user = req.body;

    const dbUser = await findUserByEmail(user.email);

    if (!dbUser) {
      res.send("Bunday email oldin ro'yxatdan otmagan");
    }

    const checkPassword = await bcrypt.compare(user.password, dbUser.password);

    if (!checkPassword) {
      res.send(`<a>parol xato</a>`);
    }

    const accessToken = generateAccessToken({ email: user.email });

    res.cookie("token", accessToken);
    res.redirect("http://localhost:4000/student/dormitory-list");
  } catch (err) {
    console.log(err);
  }
}

export async function findUserByEmail(email) {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  return result.rows[0];
}

function generateAccessToken(data) {
  return jwt.sign(data, getConfig("JWT_ACCCES_SECRET"), { expiresIn: "10m" });
}
