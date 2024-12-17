import pkg from 'pg';
import { getconfig } from '../config.service.js';
const {Pool} = pkg

export const pool = new Pool({
    host: getconfig("DATABASE_HOST"),
    port: parseInt(getconfig("DATABASE_PORT")),
    database: getconfig("DATABASE_name"),
    user: getconfig("DATABASE_USER"),
    password: getconfig("DATABASE_PASSWORD"),
});

async function connectDatabase(){
    try{
        await pool.connect();
        console.log("Database connected");
        
    }catch(err){
        console.log("Bazaga ulanishda xatolik " + err.message);
        
    }
}

async function setUpTables(){
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50),
            balance FLOAT
        )
        
        `);
    
        await pool.query(`
            CREATE TABLE IF NOT EXISTS transactions(
                id SERIAL PRIMARY KEY,
                from_user_id INTEGER,
                to_user_id INTEGER,
                amount FLOAT,
                FOREIGN KEY (from_user_id) REFERENCES users (id),
                FOREIGN KEY (to_user_id) REFERENCES users (id)        
            
            )
            
            
            
            
            `)
}

export async function initDatabase(){
    await connectDatabase();
    await setUpTables();
}