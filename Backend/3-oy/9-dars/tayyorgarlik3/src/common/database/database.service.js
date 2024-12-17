import pkg from "pg";
import { getConfig } from "../config/config.service.js";

const { Pool } = pkg;

export const pool = new Pool({
  database: getConfig("DATABASE_NAME"),
  user: getConfig("DATABASE_USER"),
  password: getConfig("DATABASE_PASSWORD"),
  host: getConfig("DATABASE_HOST"),
  port: getConfig("DATABASE_PORT"),
});

export async function connect(){ 
    try{
        await pool.connect()
        console.log("Databazaga ulandi");
        
    } catch(err){
        console.log(err.message);
        
    }
}

export async function setUpTables(req, res) {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username VARCHAR,
        email VARCHAR,
        password VARCHAR,
        email_status VARCHAR
        )
        `)
}

export async function initDatabase(req, res) {
    await connect()
    await setUpTables();
}