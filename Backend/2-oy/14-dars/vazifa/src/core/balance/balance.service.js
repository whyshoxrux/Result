import {pool} from "../../common/database/database.service.js";

export async function updateBalance(req, res){
    try{
        const {id} = req.params;
        const newBalance = req.body;
        const result = await pool.query(
            `UPDATE users SET balance = balance + $1 WHERE id=$2 RETURNING *`,
            [newBalance.amount, id]
        );
        res.send(result.rows[0])
    } catch(err){
        res.send("Error" + err.message);
    }
}
export async function getAllBalance(req, res){

    try{
        const result = await pool.query(`SELECT * FROM users`);
        res.send(result.rows);
    } catch(err){
        res.send("Error " + err.message)
    }
}