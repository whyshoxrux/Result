import getConfig from "../../common/config/config.service.js";
import { pool } from "../../common/database/database.service.js";
import CustomError from "../../common/exception/custom.error.js";
import {
  idValidator,
  registerValidator,
  udpateValidator,
} from "./register.validator.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmailConfirmation } from "../../common/service/mail.service.js";
import loginValidator from "./login.validator.js";

export async function register(req, res, next) {
  try {
    const newUser = req.body;
    const { error } = registerValidator.validate(newUser);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    // const dbUser = await findUserByEmail(newUser.email);
    // if (dbUser) {
    //   throw new CustomError("Bunday email oldin royhatdan otgan", 401);
    // }
    // const hashedPassword = await hashPasssword(newUser.password);

    const result = await pool.query(
      `
            INSERT INTO users (
                name, email, password, role
            ) VALUES ($1, $2, $3, $4) RETURNING *
        `,
      [
        newUser.name,
        newUser.email,
        // hashedPassword,
        newUser.password,
        newUser.role,
      ]
    );

    const emailConfirmationToken = generateEmailConfirmationToken({email: newUser.email})

    await sendEmailConfirmation(
      newUser.email,
      newUser.name,
      emailConfirmationToken
    );
    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    next(error);
  }
}
export async function getAllUsers(req, res, next) {
  try {
    const result = await pool.query(`
      SELECT 
        * FROM users;
    `);
    res.send(result.rows);
  } catch (error) {
    next(error);
  }
}
export async function get(req, res, next) {
  try {
    const { id } = req.params;

    const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
    res.status(200).send(result.rows[0]);
  } catch (error) {
    next(error);
  }
}
export async function verifyEmail(req, res, next) {
  try {
    console.log(12345)
    const { token } = req.params;
    const resultJwt =  jwt.verify(
      token,
      getConfig("JWT_EMAIL_CONFIRMATION_SECRET")
    );
    const result = await pool.query(
      `
      UPDATE users SET status=$1 WHERE email=$2 
      `,
      [true, resultJwt.email]
    );
    res.status(200).send("Email tasdiqlandi");
  } catch (error) {
    console.log(error)
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

export async function update(req, res, next) {
  try {
    const { error: errorParams } = idValidator.validate(req.params);
    if (errorParams) {
      return res.status(400).send(errorParams.details[0].message);
    }
    const { error: errorBody } = udpateValidator.validate(req.body);
    if (errorBody) {
      return res.status(400).send(errorBody.details[0].message);
    }
    const { id } = req.params;
    const old = await pool.query(
      `
        SELECT * FROM users WHERE id = $1`,
      [id]
    );
    const newv = req.body;
    const { name, email, password, role, status } = {
      ...old,
      ...newv,
    };
    const result = await pool.query(
      `
        UPDATE users SET name = $1, email = $2, password = $3, role = $4, status = $5 WHERE id = $6
    `,
      [name, email, password, role, status, id]
    );
    res.status(200).send("Muvaffaqiyatli yangilandi getAll qilib tekshirib ko'rishiz mumkin");
  } catch (err) {
    next(err);
  }9
}

export async function deletee(req, res, next) {
  try {
    const { error: errorParams } = idValidator.validate(req.params);
    if (errorParams) {
      return res.status(400).send(errorParams.details[0].message);
    }
    const { id } = req.params;
    const result = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.status(500).send("error: " + err.message);
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
function generateEmailConfirmationToken(data) {
  return jwt.sign(data, getConfig("JWT_EMAIL_CONFIRMATION_SECRET"), {
    expiresIn: "15m",
  });
}