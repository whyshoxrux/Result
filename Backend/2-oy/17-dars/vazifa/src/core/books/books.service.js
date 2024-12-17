import { pool } from "../../common/database/database.service.js";

export async function add(req, res) {
    try{
        const newData = req.body;
        const result = await pool.query(`
            INSERT INTO books (title, author, published_date) 
            VALUES ($1, $2, $3) RETURNING *
            `, [newData.id, newData.title, newData.author, newData.published_date]);
        res.send(result.rows[0]);
    } catch(err){
        res.send("Kitoblarni kiritishda xatolik: " + err.message)
    }
}

export async function getAll(req, res){
    try{
        const result = await pool.query(`SELECT * FROM books`);
        res.send(result.rows)
    } catch(err){
        res.send("Kitoblarni olishda xatolik: " + err.message)
    }
}