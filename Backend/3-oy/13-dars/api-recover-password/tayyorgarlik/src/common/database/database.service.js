import pkg from 'pg'
import getConfig from '../config/config.service.js'

const {Pool} = pkg;

export const pool = new Pool({
    database: getConfig("DATABASE_NAME"),
    user: getConfig("DATABASE_USER"),
    password: getConfig("DATABASE_PASSWORD"),
    host: getConfig("DATABASE_HOST"),
    port: parseInt(getConfig("DATABASE_PORT")),
});

async function connectToDb(){
    try{
        await pool.connect();
        console.log('Bazaga ulandi');
        
    } catch(err){
        console.log("Bazaga ulanishda xatolik", err.message);
        
    }
}

async function setUpModels(){
    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS dormitory(
            id SERIAL PRIMARY KEY,
            first_name VARCHAR,
            second_name VARCHAR,
            group_name VARCHAR,
            phone VARCHAR,
            from_place VARCHAR
            );

        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            username VARCHAR,
            email VARCHAR,
            password VARCHAR
        )
            `)
    } catch(err){
        console.log("Table larni yaratishda xatolik", err.message);
        
    }
}

export async function initDatabase() {
    await connectToDb()
    await setUpModels();
}