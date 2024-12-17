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
  await setupModels();
}

async function connectToDb() {
  try {
    await pool.connect();
    console.log("Bazaga ulandi");
  } catch (err) {
    console.log("Bazaga ulanishda hatolik boldi", err.message);
  }
}
async function setupModels() {
  try {
    await pool.query(
      `
                CREATE TABLE IF NOT EXISTS dormitory (
                    first_name VARCHAR NOT NULL,
                    second_name VARCHAR NOT NULL,
                    group_name VARCHAR NOT NULL,
                    phone VARCHAR NOT NULL,
                    from_place VARCHAR NOT NULL
                );
            `
    );

    await pool.query(`
       CREATE TABLE IF NOT EXISTS users (
       id SERIAL PRIMARY KEY,
       username VARCHAR NOT NULL,
       email VARCHAR NOT NULL UNIQUE,
       password VARCHAR NOT NULL
       );
      `);
  } catch (err) {
    console.log("Bazani sinxronlashda hatolik boldi", err.message);
  }
}
