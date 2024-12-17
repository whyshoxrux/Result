import { pool } from "../../common/database/database.service.js";
import { createUserValidator, loginValidator } from "./user.validator.js";
import { getconfig } from "../../common/config/config.service.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export async function add(req, res) {
  try {
    const newData = req.body;
    const {error} = createUserValidator.validate(newData);
    if(error){
        return res.send(error.details[0].message);
    }
    const dbUser = await findUserByEmail(newData.email);

    if(dbUser){
        return res.send("Bunday email royxatdan otgan")
    }
    const hashedpassword = await bcrypt.hash(newData.password, 10)
    const result = await pool.query(
      `
            INSERT INTO users (name, email, password, createdAt, updatedAt) 
            VALUES ($1,$2,$3,$4,$5) RETURNING *
            `,
      [
        newData.name,
        newData.email,
        newData.password,
        newData.createdAt,
        newData.updatedAt,
      ]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.send("Userni qo'shishda xatolik: " + err.message);
  }
}

export async function get(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
            SELECT * FROM users WHERE user_id=$1
            `,
      [id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.send("Userni olishda xatolik: " + err.message);
  }
}

export async function getAll(req, res) {
  try {
    const result = await pool.query(`
        SELECT * FROM users
        `)
    res.send(result.rows)
  } catch (err) {
    res.send("Users ni olishda xatolik: " + err.message);
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const newData = req.body;

    const oldCustomer = await pool.query(
      `
            SELECT * FROM users WHERE user_id = $1
            `,
      [id]
    );
    const { name, email, password, createdAt, updatedAt } = {
      ...oldCustomer[0],
      ...newData,
    };

    const result = await pool.query(
      `
            UPDATE users SET name=$1, email=$2, password=$3, createdAt=$4, updatedAt=$5 
            WHERE user_id=$6 RETURNING *
            `,
      [name, email, password, createdAt, updatedAt, id]
    );

    res.send(result.rows[0]);
  } catch (err) {
    console.log(err);

    res.send("Userni yangilashda xatolik: " + err.message);
  }
}

export async function deletee(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
            DELETE FROM users WHERE user_id = $1
            `,
      [id]
    );
    res.send("User muvaffaqiyatli o'chirildi🫡");
  } catch (err) {
    res.send("Userni o'chirishda xatolik: " + err.message);
  }
}

export async function loginUser(req, res) {
  try {
    const { error } = loginValidator.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { email, password } = req.body;
    const dbUser = await findUserByEmail(email);

    if (!dbUser) {
      return res.status(404).send("Bunday email royhatdan otmagan");
    }
    const checkPassword = await bcrypt.compare(password, dbUser.password);

    if (!checkPassword) {
      return res.status(403).send("Email yoli parol hato");
    }

    const token = kalitYasash({ email });
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send("Hatolik boldi" + err.message);
  }
}

function kalitYasash(data) {
  return jwt.sign(data, getConfig("JWT_SECRET"), { expiresIn: "1d" });
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
