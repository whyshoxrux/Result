import pkg from 'pg';
import getConfig from '../config/config.service.js';

const {Pool} = pkg

export const pool = new Pool({
    database: getConfig("DATABASE_NAME"),
    user: getConfig("DATABASE_USER"),
    password: getConfig("DATABASE_PASSWORD"),
    host: getConfig("DATABASE_HOST"),
    port: parseInt(getConfig("DATABASE_PORT")),   
})

export async function initDatabase() {
    connectToDb();
    setUpTables()
}

async function connectToDb(){
    try{
        await pool.connect()
        console.log("Databazaga ulandi");
        
    } catch(err){
        console.log("Bazaga ulanishda xatolik: ", err.message);
        
    }
}

async function setUpTables(){
    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS dormitory(
            first_name VARCHAR NOT NULL,
            second_name VARCHAR NOT NULL,
            group_name VARCHAR NOT NULL,
            phone VARCHAR NOT NULL,
            address VARCHAR NOT NULL
            );
            `)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            username VARCHAR,
            email VARCHAR NOT NULL UNIQUE,
            password VARCHAR NOT NULL
            )
            `)
    } catch(err){
        console.log("Jadvallarni yaratishda xatolik", err.message);
        
    }
} 