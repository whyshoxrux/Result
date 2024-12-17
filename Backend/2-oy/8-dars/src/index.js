// import express from "express";
// import dotenv from "dotenv";
// dotenv.config()
// const app = express()

// const PORT = process.env.PORT || 3000

// async function init (){
//     app.listen(PORT, () => console.log(`Server ${PORT} da ishladi`))
// }
// init()

import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
});

async function init() {
  try {
    await pool.connect();
    console.log("Bazaga ulandi");

    const talabalar = await pool.query(`SELECT * FROM talabalar`);
    console.log(talabalar.rows);
  } catch (err) {
    console.log("Malumotlarni olishda xatolik");
  }
}
init();
