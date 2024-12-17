import getConfig from "../config/config.service.js";
import pkg from 'pg';

const { Pool } = pkg;
export const pool = new Pool({
  host: getConfig("DATABASE_HOST"),
  port: parseInt(getConfig("DATABASE_PORT")),
  database: getConfig("DATABASE_NAME"),
  user: getConfig("DATABASE_USER"),
  password: getConfig("DATABASE_PASSWORD"),
});

export default async function initDatabase() {
  await setUpTables();
  await ConnecttoDb();
}

async function setUpTables() {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        first_name VARCHAR,
        second_name VARCHAR,
        phone VARCHAR,
        password VARCHAR,
        balance FLOAT,
        telegram_id INTEGER
        )
        `);
  } catch (err) {
    console.log("Table larni yaratishda xatolik:", err);
  }
}

async function ConnecttoDb() {
  try {
    await pool.connect();
    console.log("Bazaga ulandi");
  } catch (err) {
    console.log("Bazaga ulanishda xatolik: ", err);
  }
}
