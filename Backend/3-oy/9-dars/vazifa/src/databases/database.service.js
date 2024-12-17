import pkg from 'pg'
import getConfig from '../common/config/config.service.js';
const {Pool} = pkg

export const pool = new Pool({
    database: getConfig("DATABASE_NAME"),
    user: getConfig("DATABASE_USER"),
    password: getConfig("DATABASE_PASSWORD"),
    host: getConfig("DATABASE_HOST"),
    port: parseInt(getConfig("DATABASE_PORT"))
})

async function connectToDb(req, res) {
    try{
        await pool.connect()
        console.log("Bazaga ulandi");        
    } catch(err){
        console.log("Bazaga ulanishda xato: " + err.message);
        
    }
}

async function setUpTables(){
    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            username VARCHAR,
            email VARCHAR,
            password VARCHAR,
            email_status VARCHAR DEFAULT 'false'
            )
            `)
    } catch(err){
        console.log("Tableni yaratishda xatolik: " + err.message);
        
    }
}

export async function initDatabase() {
    await setUpTables();
    await connectToDb();
}