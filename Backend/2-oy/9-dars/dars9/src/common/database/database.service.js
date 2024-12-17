import pkg from "pg";
const { Pool } = pkg;
import { getConfig } from "../config/config.service.js";

export const pool = new Pool({
  database: getConfig("DATABASE_NAME"),
  user: getConfig("DATABASE_USER"),
  password: getConfig("DATABASE_PASSWORD"),
  host: getConfig("DATABASE_HOST"),
  port: parseInt(getConfig("DATABASE_PORT")),
});

async function connectToDatabase() {
  try {
    await pool.connect();
    console.log("Connected to database");
  } catch (err) {
    console.log("Error connecting database", err.message);
  }
}
async function setupTables() {
  await pool.query(`CREATE TABLE IF NOT EXISTS projects (
          project_id SERIAL PRIMARY KEY,
          project_name VARCHAR(100),
          start_date DATE,
          end_date DATE
      )`);
}
export async function initDatabase() {
  await connectToDatabase();
  await setupTables();
}
