import pkg from "pg";
const {Pool} = pkg;

import { getconfig } from "../config/config.service.js";

export const pool = new Pool({
    database: getconfig("DATABASE_NAME"),
    user:getconfig("DATABASE_USER"),
    password:getconfig("DATABASE_PASSWORD"),
    host:getconfig("DATABASE_HOST"),
    port:parseInt(getconfig("DATABASE_PORT")),
})

async function connectDatabase(){
    try{
        await pool.connect();
        console.log("Connected to database");
        
    } catch (err){
        console.log(err.message);
    }
}

async function setupTables(){
    await pool.query(`CREATE TABLE IF NOT EXISTS students(
        id SERIAL PRIMARY KEY,
        ism VARCHAR(60) NOT NULL,
        familiya VARCHAR(60) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone_number VARCHAR NOT NULL
         
        
        )
        
        `)
    
    await pool.query(`CREATE TABLE IF NOT EXISTS davomat(
        id SERIAL PRIMARY KEY,
        oy INTEGER NOT NULL,
        dars INTEGER NOT NULL,
        keldi BOOLEAN NOT NULL,
        student_id INTEGER NOT NULL
        )
        
        
        `)
}
export async function initDatabase(){
    await connectDatabase();
    await setupTables()
}