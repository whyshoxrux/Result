import pkg from "pg";
import { getconfig } from "../config/config.service.js";
const { Pool } = pgk;

export const pool = new Pool({
  database: getconfig("DATABASE_NAME"),
  user: getconfig("DATABASE_USER"),
  password: getconfig("DATABASE_PASSWORD"),
  host: getconfig("DATABASE_HOST"),
  port: getconfig("DATABASE_PORT"),
});

export async function initDatabase() {
  await connect();
}

export async function connect() {
  try {
    await pool.connect();
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
}

export async function setUpTables() {
  try {
    await pool.query(`
            CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
        );
          `)
        
    await pool.query(`
        CREATE TABLE books (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            published_date DATE,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        
        
        `)
    await pool.query(`
        CREATE TABLE userbooks (
            id SERIAL PRIMARY KEY,
            user_id INT NOT NULL,
            book_id INT NOT NULL,
            borrowed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            returned_at TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES Users(id),
            FOREIGN KEY (book_id) REFERENCES Books(id)
        ); 
        `);

  } catch (err) {
    res.send("Table kiritishda xato: " + err.message);
  }
}
