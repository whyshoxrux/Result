import pkg from "pg";
import getconfig from "../config/config.servic.js";
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
            CREATE TABLE IF NOT EXISTS kafedra (
                kafedra_id SERIAL PRIMARY KEY,
                name VARCHAR NOT NULL
            )
        `);
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                user_id SERIAL PRIMARY KEY,
                first_name VARCHAR NOT NULL,
                second_name VARCHAR NOT NULL,
                email VARCHAR NOT NULL,
                password VARCHAR NOT NULL,
                role users_enum,
                kafedra_id INTEGER,
                FOREIGN KEY (kafedra_id) REFERENCES kafedra ( kafedra_id )
            )
                `);
    await pool.query(`
            CREATE TABLE IF NOT EXISTS index_information(
                index_information_id SERIAL PRIMARY KEY,
                teacher_id INTEGER,
                index_form_id INTEGER,
                status index_information_enum,
                rate INTEGER,
                created_at TIMESTAMP DEFAULT NOW(),
                FOREIGN KEY (teacher_id) REFERENCES users ( user_id )
            )
            `);
    await pool.query(`
            CREATE TABLE IF NOT EXISTS index_forms(
            index_form_id SERIAL PRIMARY KEY,
            index_form_name VARCHAR,
            index_form_number VARCHAR 
            )`);
  } catch (err) {
    console.log(err);

    console.log("Jadvallarni yaratishda xatolik:" + err.message);
  }
}
export async function initDatabase() {
  await setUpModels();
  await connectToDb();
}
