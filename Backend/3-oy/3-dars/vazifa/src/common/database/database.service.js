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
        user_id SERIAL PRIMARY KEY,
        name VARCHAR,
        email VARCHAR,
        password VARCHAR,
        createdAt DATE,
        updatedAt DATE
        )
        `);
    
    await pool.query(`
        CREATE TABLE IF NOT EXISTS seller(
        id SERIAL PRIMARY KEY,
        name VARCHAR,
        shopName VARCHAR,
        contactInfo VARCHAR,
        user_id INTEGER,
        createdAt DATE,
        updatedAt DATE,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        )
        `);
    
    await pool.query(`
        CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        name VARCHAR,
        description VARCHAR,
        price INTEGER,
        seller_id INTEGER,
        createdAt DATE,
        updatedAt DATE,
        FOREIGN KEY (seller_id) REFERENCES seller(id)
        )
        `)
    
    await pool.query(`
        CREATE TABLE IF NOT EXISTS orders(
        id SERIAL PRIMARY KEY,
        quantity INTEGER,
        product_id INTEGER,
        user_id INTEGER,
        createdAt DATE,
        updatedAt DATE,
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        )
        `)
}

export async function initDatabase(){
    await connect()
    await setUpTables()
}
