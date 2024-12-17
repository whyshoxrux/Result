import pkg from "pg";
import getConfig from "../config/config.service.js";
const { Pool } = pkg;

export const pool = new Pool({
  database: getConfig("DATABASE_NAME"),
  user: getConfig("DATABASE_USER"),
  password: getConfig("DATABASE_PASSWORD"),
  host: getConfig("DATABASE_HOST"),
  port: parseInt(getConfig("DATABASE_PORT")),
});
export async function initDatabase() {
  await connectToDb();
  await setupTables();
}
async function connectToDb() {
  try {
    await pool.connect();
    console.log("Bazaga ulandi");
  } catch (error) {
    console.log("Bazaga ulanishda hatolik boldi", error.message);
  }
}
async function setupTables() {
  try {
    await pool.query(
      `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(100) NOT NULL,
                second_name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role VARCHAR(50) CHECK (role IN ('teacher', 'publisher', 'head_of_the_department', 'admin')) NOT NULL
  );

            CREATE TABLE IF NOT EXISTS guide_types(
              id SERIAL PRIMARY KEY,
              name VARCHAR
            );

            CREATE TABLE IF NOT EXISTS guides (
                id SERIAL PRIMARY KEY,
                teacher_id INT REFERENCES users(id) ON DELETE CASCADE,
                guide_type_id INT REFERENCES guide_types(id) ON DELETE SET NULL,
                pages_count INT CHECK (pages_count > 0),
                taqriz TEXT,
                status VARCHAR(50) CHECK (status IN ('publisher', 'head_of_the_department', 'admin', 'complete', 'rejected')) NOT NULL,
                comment TEXT
  );

        `
    );
  } catch (error) {
    console.log("Jadvallarni yaratishda hatolik boldi", error.message);
  }
}
