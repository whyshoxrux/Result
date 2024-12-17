import pkg from 'pg';
import getConfig from '../config/config.service.js';

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
    console.log("Connected to the database");
  } catch (error) {
    console.log("Error connecting to the database:", error.message);
  }
}

async function setupTables() {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS categories (
          id SERIAL PRIMARY KEY,
          name VARCHAR NOT NULL
        );
      `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        email VARCHAR NOT NULL UNIQUE,
        password VARCHAR NOT NULL,
        role VARCHAR,
        status BOOLEAN DEFAULT false
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS publishers (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        address VARCHAR
      );
    `);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        author VARCHAR NOT NULL,
        publisher_id INTEGER,
        category_id INTEGER,
        price FLOAT NOT NULL,
        FOREIGN KEY (publisher_id) REFERENCES publishers(id),
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );
    `);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        book_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        total_price FLOAT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (book_id) REFERENCES books(id)
      );
    `);


    

    console.log("Table lar muvaffaqiyatli yaratildi");
  } catch (error) {
    console.log("Jadvallarni yaratishda xatolik:", error);
  }
}
