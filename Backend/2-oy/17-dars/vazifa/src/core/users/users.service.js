import {pool} from "../../common/database/database.service.js"



export async function add(req, res) {
  try{
    const newData = req.body;
    const result = await pool.query(`
        INSERT INTO users (id, name, email, password) 
        VALUES ($1, $2, $3, $4) RETURNING * 
        `, [newData.id, newData.name, newData.email, newData.password]);
        res.send(result.rows[0])
  } catch(err){
    res.send("Users ni kiritishda xatolik: " + err.message)
  }
}
export async function getAll(req, res) {
  try{
    const result = await pool.query(`SELECT * FROM users`)
    res.send(result.rows)
  } catch(err){
    res.send("Users ni olishda xatolik: " + err.message)
  }
}