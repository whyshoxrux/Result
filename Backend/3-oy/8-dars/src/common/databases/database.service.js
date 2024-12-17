import pkg from "pg";
import { getconfig } from "../config/config.service.js";
const { Pool } = pkg;

export const pool = new Pool({
  database: getconfig("DATABASE_NAME"),
  user: getconfig("DATABASE_USER"),
  password: getconfig("DATABASE_PASSWORD"),
  host: getconfig("DATABASE_HOST"),
  port: parseInt(getconfig("DATABASE_PORT")),
});

async function connectToDb() {
  try {
    await pool.connect();
    console.log("Bazaga ulandi");
  } catch (err) {
    console.log("Bazaga ulanishda xatolik: " + err.message);
  }
}

async function setUpModels() {
  try { 
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                username VARCHAR NOT NULL,
                email VARCHAR NOT NULL,
                password VARCHAR NOT NULL,
                email_status VARCHAR NOT NULL
            )
                `);
  } catch (err) { 
    console.log(err);

    console.log("Jadvallarni yaratishda xatolik:" + err.message);
  }
}
export async function initDatabase() {
  await setUpModels();
  await connectToDb();
}
