import { pool } from "../../common/database/database.service.js";
import { createUserValidator, loginValidator } from "./user.validator.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getconfig from "../../common/config/config.servic.js";
import { emailJonatish } from "../../common/service/mail.service.js";

export async function addUser(req, res, next) {
  try {
    const newUser = req.body;
    const { error } = createUserValidator.validate(newUser);
    if (error) {
      return res.send(error.details[0].message);
    }
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const result = await pool.query(
      `
            INSERT INTO users (
            first_name, second_name, email, password, role, kafedra_id
            )  VALUES ($1,$2,$3,$4,$5,$6)
              RETURNING * 
            `,
      [
        newUser.first_name,
        newUser.second_name,
        newUser.email,
        hashedPassword,
        newUser.role,
        newUser.kafedra_id,
      ]
    );
    res.send(result.rows[0]);
  } catch (err) {
    next()
  }
}

export async function loginUser(req, res, next) {
  try {
    const user = req.body;
    const { error } = loginValidator.validate(req.body);
    if (error) {
      return res.send(error.details[0].message);
    }

    const dbUser = await findUserByEmail(user.email);
    if (!dbUser) {
        return res.send("Bunday email oldin ro'yhatdan o'tmagan");
    }

    

    const { email, password } = req.body;
    const result = await pool.query(
      `
            SELECT * FROM users WHERE email=$1
            `,
      [email]
    );
    const checkPassword = await bcrypt.compare(password, dbUser.password);

    if (!checkPassword) {
      return res.send("Email yoki parol xato");
    }
    console.log("checkPassword", checkPassword);

    const accessToken = generateAccessToken({ email: user.email });
    const refreshToken = generateRefreshToken({ email: user.email });
    return res.send({
        accessToken,
        refreshToken,
    });
    
  } catch (err) {
    next()
  }
}

export async function getAll(req, res, next) {
  console.log(req.body);

  try {
    const result = await pool.query(`SELECT users.first_name,
      users.user_id,
        users.second_name,
        users.email,
        kafedra.kafedra_id
        FROM users
        LEFT JOIN
        kafedra
        ON users.kafedra_id = kafedra.kafedra_id
        `);
    res.send(result.rows);
  } catch (err) {
    next()
  }
}

export async function get(req, res, next) {
  try {
    const {user_id}  = req.params;
    
    const result = await pool.query(`SELECT * FROM users WHERE user_id=$1`,[user_id]);
    res.send(result.rows[0]);
  } catch (err) {
    next()
  }
}

export async function update(req, res, next) {
  try {
    const { user_id } = req.params;
    const old = await pool.query(`
          SELECT * FROM users WHERE user_id = ${user_id}
          `);
    const neww = req.body;
    const { first_name, second_name, email, password, role, kafedra_id } = {
      ...old[0],
      ...neww,
    };

    const result = await pool.query(
      `
              UPDATE users SET first_name = $1, second_name = $2, email = $3, password = $4, role = $5, kafedra_id = $6 WHERE user_id = $7 RETURNING *
              `,
      [first_name, second_name, email, password, role, kafedra_id, user_id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    next()
  }
}

export async function deletee(req, res, next) {
  try {
    const { user_id } = req.params;
    const result = await pool.query(
      `DELETE FROM users WHERE user_id = ${user_id}`
    );
    res.send("O'chirildi🫡");
  } catch (err) {
    next()
  }
}


export async function refreshToken(req, res, next) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(401).send("Refresh token berilmagan");
    }
    console.log("refreshToken", refreshToken);
    console.log("JWT_REFRESH_SECRET", getconfig("JWT_REFRESH_SECRET"));
    try {
        const result = jwt.verify(
            refreshToken,
            getconfig("JWT_REFRESH_SECRET")
        );
        const accessToken = generateAccessToken({ email: result.email });
        const newRefreshToken = generateRefreshToken({ email: result.email });
        res.status(200).send({ accessToken, refreshToken: newRefreshToken });
    } catch (err) {
        res.status(403).send("Refresh token notogri:" + err.message);
    }
}

function generateAccessToken(data) {
    return jwt.sign(data, getconfig("JWT_ACCCES_SECRET"), { expiresIn: "10m" });
}

function generateRefreshToken(data) {
    return jwt.sign(data, getconfig("JWT_REFRESH_SECRET"), { expiresIn: "6h" });
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