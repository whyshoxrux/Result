import pkg from 'pg'
import getConfig from '../config/config.service.js'

const {Pool} = pkg

export const pool = new Pool({
    database: getConfig("DATABASE_NAME"),
    user: getConfig("DATABASE_USER"),
    password: getConfig("DATABASE_PASSWORD"),
    host: getConfig("DATABASE_HOST"),
    port: getConfig("DATABASE_PORT")
});

export async function initDatabase(){
    await connectToDb();
    await setupTables();
}
async function connectToDb(req, res) {
    try {
        await pool.connect()
        console.log("Bazaga ulandi");
        
    } catch (err) {
        console.log("Bazaga ulanishda xatolik:", err.message)
    }
}

async function setupTables(){
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            first_name VARCHAR,
            second_name VARCHAR,
            email VARCHAR,
            password VARCHAR,
            is_active BOOLEAN DEFAULT false
            )
            `)
    } catch (err) {
        console.log("Table larni yaratishda xatolik bo'ldi")
    }
}