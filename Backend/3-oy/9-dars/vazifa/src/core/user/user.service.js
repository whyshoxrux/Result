import { pool } from "../../databases/database.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getConfig from "../../common/config/config.service.js";
import { access, logger } from "../../common/service/logger.service.js";

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection error: ", err.message);
  logger.error(err);
});

process.on("uncaughtException", (err) => {
  console.log("uncaughtException error: ", err.message);
  logger.error(err);
});

export async function register(req, res) {
  try {
    const newData = req.body;

    const dbUser = await findUserByEmail(newData.email);

    if (dbUser) {
      return res.send("Bu email royxatdan otgan");
    }

    const hashedPassword = await bcrypt.hash(newData.password, 10);

    const result = await pool.query(
      `
            INSERT INTO users (username, email, password) 
            VALUES($1, $2, $3)

            
            `,
      [newData.username, newData.email, hashedPassword]
    );
    access.info("Zor ishladi gap yo'q");
  } catch (err) {
    res.send("Error: " + err.message);
  }
}

export async function getAll(req, res) {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.send(result.rows);
  } catch (err) {
    res.send("Error: ");
  }
  access.info("Zor ishladi gap yo'q");
}

async function findUserByEmail(email) {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);

  return result.rows[0];
}

async function tokenYasash(data) {
  return jwt.sign(data, getConfig(JWT_ACCCES_SECRET), {
    expiresIn: "1h",
  });
  access.info("Zor ishladi gap yo'q");
}

export async function loginUser(req, res) {
  const newData = req.body;
  const dbUser = await findUserByEmail(newData.email);
  if (!dbUser) {
    throw (
      new Error("Email oldin royxatdan otmagan", 401) &&
      res.send("Email oldin royxatdan otmagan")
    );
  }
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      `
            SELECT * FROM users WHERE email=$1
            `,
      [email]
    );

    const checkPassword = await bcrypt.compare(password, dbUser.password);

    if (!checkPassword) {
      return res.send("Passwordda xato: " + err.message);
    }
    console.log("checkPassword", checkPassword);

    const accessToken = generateAccessToken({ email: newData.email });
    const refreshToken = generateRefreshToken({ email: newData.email });
    res.send({ accessToken, refreshToken });
    access.info("Zor ishladi gap yo'q");
  } catch (err) {
    console.log("Error: ", err);
    res.send("Error: " + err.message);
  }
}

function generateAccessToken(data) {
  return jwt.sign(data, getConfig("JWT_ACCCES_SECRET"), { expiresIn: "1h" });
}
function generateRefreshToken(data) {
  return jwt.sign(data, getConfig("JWT_REFRESH_SECRET"), { expiresIn: "1h" });
}
