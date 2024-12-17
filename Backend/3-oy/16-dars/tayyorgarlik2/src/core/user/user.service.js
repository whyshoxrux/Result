import getConfig from "../../common/config/config.service.js";
import { pool } from "../../common/database/database.service.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
export const devices = {};

export async function register(req, res) {
  try {
    const newData = req.body;
    console.log(newData.phone)

    const dbUser = await findUserByPhone(newData.phone);
    if (dbUser) {
      return res
        .status(400)
        .send("Bunday telefon raqam oldin ro'yxatdan o'tgan");
    }

    const hashedPassword = await bcrypt.hash(newData.password, 10);

    const result = await pool.query(
      `INSERT INTO users(
            first_name, second_name, phone, password, balance, telegram_id
            ) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        newData.first_name,
        newData.second_name,
        newData.phone,
        hashedPassword,
        newData.balance,
        newData.telegram_id,
      ]
    );
    res.send(result.rows[0])
  } catch (error) {
    console.log(error);
    
    res.send("Error: " + error.message);
  }
}

export async function findUserByPhone(phone) {
  const result = await pool.query(`SELECT * FROM users WHERE phone=$1`, [phone]);
  return result.rows[0];
}

export async function getAll(req, res){

    try {
        const result = await pool.query(`SELECT * FROM users`)
        res.send(result.rows)
    } catch (error) {
        res.send("Error: " + error.message)
    }
}

export async function login(req, res){
    try {
        const user = req.body;

        const dbUser = await findUserByPhone(user.phone);
        if(!dbUser){
            return res.send("Bunday telefon raqam ro'yxatdan o'tmagan")
        }

        const checkPassword = await bcrypt.compare(user.password, dbUser.password)

        if(!checkPassword){
            return res.send("Telefon raqam yoki parol xato")
        }

        const token = await kalitYasash({phone: user.phone});

        res.cookie("Token:", token)
        res.redirect("/payment/transfer")
    } catch (error) {
        res.send("Error: " + error.message)
    }
}

function kalitYasash(data){
    return jwt.sign(data, getConfig("JWT_SECRET"), {expiresIn: '1h'})
}