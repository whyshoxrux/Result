import { getConfig } from "../common/config/config.service.js";
import { pool } from "../common/database/database.service.js";
import { access, logger } from "../common/service/logger.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection error: ", err.message);
  logger.error(err);
});

process.on("uncaughtException", (err) => {
  console.log("uncaughtException error", err.message);
  logger.error(err);
});

export async function add(req, res) {
  try {
    const newData = req.body;

    const hashedPassword = await bcrypt.hash(newData.password, 10);

    const result = await pool.query(
      `
            INSERT INTO users (username, email, password, email_status)
            VALUES ($1, $2, $3, $4) RETURNING *
            `,
      [newData.username, newData.email, hashedPassword, "false"]
    );
    res.send(result.rows[0]);
    access.info("Hammasi chotki ishlayapti brat");
  } catch (err) {
    res.send("Error: " + err.message);
  }
}

export async function login(req, res) {
  try {
    const newData = req.body;

    const dbUser = await findUserByEmail(newData.email);

    if (!dbUser) {
      throw (
        new Error("Email oldin royxatdan otmagan") &&
        res.send("Email oldin royxatdan otmagan")
      );
    }
    const { email, password } = req.body;
    
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);
    
    const checkPassword = await bcrypt.compare(password, dbUser.password);
    
    if (!checkPassword) {
      return res.send("Passwordda xatolik: ");
    }
    console.log("Dilobar");
    console.log("checkPassword", checkPassword);
    
    const accessToken = generateAccessToken({ email: newData.email });
    const refreshToken = generateRefreshToken({ email: newData.email });
    
    res.send({ accessToken, refreshToken });
    access.info("Hammasi chotki ishladi");
  } catch (err) {
    res.send("Error: " + err.message);
  }
}

export async function getAll(req, res) {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.send(result.rows);
  } catch (err) {
    res.send("Error: " + err.message);
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const oldData = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

    const newData = req.body;
    const { username, email, password, email_status } = {
      ...oldData.rows[0],
      ...newData,
    };

    const result = await pool.query(
      `UPDATE users SET username = $1, email = $2, password = $3, email_status = $4 WHERE id = $5 RETURNING *`,
      [username, email, password, email_status, id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.send("Error: " + err.message);
  }
}

async function findUserByEmail(email) {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  return result.rows[0];
}

function generateAccessToken(data) {
  return jwt.sign(data, getConfig("JWT_ACCCES_SECRET"));
}
function generateRefreshToken(data) {
  return jwt.sign(data, getConfig("JWT_REFRESH_SECRET"));
}
