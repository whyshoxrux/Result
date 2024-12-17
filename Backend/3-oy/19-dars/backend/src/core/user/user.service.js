import getConfig from "../../common/config/config.service.js";
import { pool } from "../../common/database/database.service.js";
import CustomError from "../../common/exceptionFilter/custom.error.js";
import registerValidator from "./validators/register.validator.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmailConfirmation } from "../../common/service/mail.service.js";
import loginValidator from "./validators/login.validator.js";

export async function register(req, res, next) {
  try {
    const newUser = req.body;
    const { error } = registerValidator.validate(newUser);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const dbUser = await findUserByEmail(newUser.email);
    // console.log('dbUser')
    if (dbUser) {
      throw new CustomError("Bunday email oldin royhatdan otgan", 401);
    }
    const hashedPassword = await hashPasssword(newUser.password);

    await pool.query(
      `
            INSERT INTO users (
                first_name, second_name, email, password, role
            ) VALUES ($1, $2, $3, $4, $5) RETURNING *
        `,
      [
        newUser.first_name,
        newUser.second_name,
        newUser.email,
        hashedPassword,
        newUser.role,
      ]
    );
    const emailConfirmationToken = await generateEmailConfirmationToken({
      email: newUser.email,
    });
    await sendEmailConfirmation(
      newUser.email,
      newUser.first_name,
      emailConfirmationToken
    );
    res.status(200).send("Email tasqish uchun jonatildi");
  } catch (error) {
    console.log(error);
    next(error);
  }
}
function generateEmailConfirmationToken(data) {
  return jwt.sign(data, getConfig("JWT_EMAIL_CONFIRMATION_SECRET"), {
    expiresIn: "15m",
  });
}
export async function getAllUsers(req, res) {
  try {
    const result = await pool.query(`SELECT * FROM users;`);
    res.status(200).send(result.rows);
  } catch (error) {
    next(error);
  }
}
export async function verifyEmail(req, res) {
  try {
    const { token } = req.params;
    const resultJwt = await jwt.verify(
      token,
      getConfig("JWT_EMAIL_CONFIRMATION_SECRET")
    );
    const result = await pool.query(
      `
                UPDATE users SET is_active=$1 WHERE email=$2 
            `,
      [true, resultJwt.email]
    );
    res.status(200).send("Email tasdiqlandi");
  } catch (error) {
    next(error);
  }
}
export async function login(req, res, next) {
  console.log("login", req.body);
  try {
    const user = req.body;
    const { error } = loginValidator.validate(user);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const dbUser = await findUserByEmail(user.email);
    if (!dbUser) {
      throw new CustomError("Email yoki parol hato", 403);
    }

    const checkPasswordResult = checkPassword(user.password, dbUser.password);
    if (!checkPasswordResult) {
      throw new CustomError("Email yoki parol hato", 403);
    }

    const accessToken = await generateAccesToken({ email: user.email });
    const refreshToken = await generateRefreshToken({ email: user.email });
    res.status(200).send({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
}
export async function autologin(req, res) {
  res.status(200).send(req.user);
}
function generateAccesToken(data) {
  return jwt.sign(data, getConfig("JWT_ACCESS_SECRET"), { expiresIn: "1h" });
}
function generateRefreshToken(data) {
  return jwt.sign(data, getConfig("JWT_REFRESH_SECRET"), { expiresIn: "8h" });
}
function checkPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}
function hashPasssword(password) {
  return bcrypt.hash(password, 10);
}
export async function findUserByEmail(email) {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  return result.rows[0];
}
