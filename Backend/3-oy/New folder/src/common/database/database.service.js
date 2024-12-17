import pkg from 'pg'
import getConfig from '../config/config.service.js';

const {Pool} = pkg

export const pool = new Pool({
    database: getConfig("DATABASE_NAME"),
    user: getConfig("DATABASE_USER"),
    password: getConfig("DATABASE_PASSWORD"),
    host: getConfig("DATABASE_HOST"),
    port: parseInt(getConfig("DATABASE_PORT")),   
});
export async function initDatabase(){
    await connectToDb();
    await setupTables();
}
async function connectToDb(){
    try {
        await pool.connect();
        console.log("Bazaga ulandi");
    } catch (error) {
        console.log("Bazaga ulanishda xato:", error.message)
    }
}
async function setupTables() {
    try {
          await pool.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_roles') THEN
                    CREATE TYPE user_roles AS ENUM ('ADMIN', 'OPERATOR');
              END IF;
            END$$;
    
            CREATE TABLE IF NOT EXISTS users (
                first_name VARCHAR NOT NULL,
                second_name VARCHAR NOT NULL,
                email VARCHAR NOT NULL UNIQUE,
                password VARCHAR NOT NULL,
                is_active BOOLEAN DEFAULT false,
                role user_roles
            );
        `
    );
  } catch (error) {
    console.log("Jadvallarni yaratishda hatolik boldi", error.message);
  }
}
