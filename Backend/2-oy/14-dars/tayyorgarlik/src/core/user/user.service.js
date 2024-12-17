import { pool } from "../../common/database/database.service.js";

export async function addUser(req, res){
    try{
        const newUser = req.body;
        const result = await pool.query(
            `INSERT INTO users (name, balance) VALUES($1, $2) RETURNING *`,
            [newUser.name, newUser.balance]
        );
        res.send(result.rows[0]);
    } catch(err){
        res.send("Kiritishda xatolik " + err.message);
    }
}
export async function getAllUser(req, res){
    try{
        const result = await pool.query(`SELECT * FROM users`);
        res.send(result.rows);
    } catch (err){
        res.send("User larni olishda xatolik: " + err.message);
    }
}
export async function getUser(req, res){
    try{
        const {id} = req.params;
        const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
        res.send(result.rows[0]);
    } catch(err){
        res.send("User ni olishda xatolik: " + err.message);
    }
}
export async function updateUser(req, res){
    try{
    const {id} = req.params;
    const newUser = req.body;
    const oldData = await pool.query(`SELECT * FROM users`);
    const updatedData = {...oldData.rows, ...newUser}
    const newData = await pool.query(
        `UPDATE users SET name = $1, balance = $2 WHERE id=$3 RETURNING *`,
        [updatedData.name, updatedData.balance, id]
    )
    res.send(newData.rows[0])
    } catch(err){
        res.send("User ni yangilashda xatolik: " + err.message);
    }
}
export async function deleteUser(req, res){
    try{
        const {id} = req.params;
        const result = await pool.query(
            `DELETE FROM users WHERE id=$1 RETURNING *`, [id]
        )
        res.send(result.rows[0])
    } catch(err){
        res.send("User ni ochirishda xato: " + err.message)
    }
}