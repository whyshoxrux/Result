import { pool } from "../../common/database/database.service.js";
export async function takingBook(req, res){
    try{
        const newData = req.body;
        const result = await pool.query(`
            INSERT INTO userbooks (user_id, book_id) 
            VALUES ($1, $2)
            
            ` [newData.id, newData.user_id, newData.book_id]);
            res.send(result.rows[0])
    } catch(err){
        res.send("Kitoblarni kiritishda xatolik: " + err.message)
    }
}

export async function returningBook(req, res){
    try{
        const newData = req.body;
        const result = await pool.query(`
            INSERT INTO userbooks (user_id, book_id, returned_at) 
            VALUES ($1, $2, $3)
            
            ` [newData.id, newData.user_id, newData.book_id, newData.returned_at]);
            res.send(result.rows[0])
    } catch(err){
        res.send("Kitoblarni kiritishda xatolik: " + err.message)
    }
}

export async function getAll(req, res){
    try{
        const result = await pool.query(`SELECT * FROM userbooks RETURNING *`)
        res.send(result.rows)
    } catch(err){
        res.send("Olishda xatolik: " + err.message)
    }
}