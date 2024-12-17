import pkg from "pg";
import { getconfig } from "../config/config.js";
const { Pool } = pkg;

export const pool = new Pool({
  host: getconfig("DATABASE_HOST"),
  port: parseInt(getconfig("DATABASE_PORT")),
  database: getconfig("DATABASE_NAME"), 
  user: getconfig("DATABASE_USER"),
  password: getconfig("DATABASE_PASSWORD"),
});

async function connectDatabase() {
  try {
    await pool.connect();
    console.log("Database Connected");
  } catch (err) {
    console.log("Error: " + err.message);
  }
}

async function setupTables() {
  // await pool.query(`DROP TABLE users`) 
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50),
            balance FLOAT  
        )
    `);
  await pool.query(`
        CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            from_user_id INTEGER,
            to_user_id INTEGER,
            amount FLOAT, 
            FOREIGN KEY (from_user_id) REFERENCES users (id),
            FOREIGN KEY (to_user_id) REFERENCES users (id)
        )
    `);
}

export async function initDatabase() {
  await connectDatabase();
  await setupTables();
}
