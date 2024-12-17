import pkg from "pg";
import { getconfig } from "../config/config.service.js";

const { Pool } = pkg;

export const pool = new Pool({
  database: getconfig("DATABASE_NAME"),
  user: getconfig("DATABASE_USER"),
  password: getconfig("DATABASE_PASSWORD"),
  host: getconfig("DATABASE_HOST"),
  port: getconfig("DATABASE_PORT"),
});

export async function connect() {
  try {
    await pool.connect();
    console.log("Database is connected");
  } catch (err) {
    console.log(err.message);
  }
}

export async function setUpTables() {
  await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            username VARCHAR,
            email VARCHAR,
            password VARCHAR,
            email_status VARCHAR
  )    
           `);
}
export async function initDatabase() {
  await connect();
  await setUpTables();
}
