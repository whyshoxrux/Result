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
            CREATE TABLE IF NOT EXISTS category(
            category_id SERIAL PRIMARY KEY,
            category_name VARCHAR
            )   
            `);
  await pool.query(`
            CREATE TABLE IF NOT EXISTS sellers(
            seller_id SERIAL PRIMARY KEY,
            first_name VARCHAR,
            second_name VARCHAR,
            company_name VARCHAR
            )    
            `);
  await pool.query(`
            CREATE TABLE IF NOT EXISTS customers(
            customer_id SERIAL PRIMARY KEY,
            first_name VARCHAR,
            second_name VARCHAR
            )
            `);
await pool.query(`
                CREATE TABLE IF NOT EXISTS products (
                product_id SERIAL PRIMARY KEY,
                name VARCHAR,
                unit_price INTEGER,
                seller_id INTEGER,
                category_id INTEGER,
                FOREIGN KEY (seller_id) REFERENCES sellers ( seller_id ),
                FOREIGN KEY (category_id) REFERENCES category ( category_id )
                )
            `); 
  await pool.query(`
            CREATE TABLE IF NOT EXISTS orders(
            order_id SERIAL PRIMARY KEY,
            customer_id INTEGER,
            product_id INTEGER,
            FOREIGN KEY (customer_id) REFERENCES customers ( customer_id ),
            FOREIGN KEY (product_id) REFERENCES products ( product_id )
            )    
            `);
}
export async function initDatabase() {
  await connect();
  await setUpTables()
}
