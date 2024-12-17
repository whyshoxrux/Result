import pkg from "pg";
import getConfig from "../common/config/config.service.js"
const { Pool } = pkg;

export const pool = new Pool({
    database: getConfig("DATABASE_NAME"),
    user: getConfig("DATABASE_USER"),
    password: getConfig("DATABASE_PASSWORD"),
    host: getConfig("DATABASE_HOST"),
    port: parseInt(getConfig("DATABASE_PORT")),
});

export async function initDatabase() {
    await connectToDb();
    await setupModels();
}
async function connectToDb() {
    try {
        await pool.connect();
        console.log("Bazaga ulandi");
    } catch (err) {
        console.log("Bazaga ulanishda hatolik:", err.message);
    }
}

async function setupModels() {
    try {
        await pool.query(` 
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR NOT NULL,   
            second_name VARCHAR NOT NULL,
            phone VARCHAR NOT NULL,
            address VARCHAR NOT NULL
        )
    `); 
        console.log("Jadvallarni yaratdi");
    } catch (err) {
        console.log("Jadvallarni yaratishda hatolik boldi", err);
    }
}