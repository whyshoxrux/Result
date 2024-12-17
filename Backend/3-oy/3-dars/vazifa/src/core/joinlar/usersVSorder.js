import { pool } from "../../common/database/database.service.js";

export async function joinUserVSOrder(req, res){
    try{
        const result = await pool.query(`
            SELECT users.name,
            users.email,
            orders.product_id,
            orders.quantity
            FROM
            users
            LEFT JOIN
            orders
            ON
            users.user_id = orders.user_id
            GROUP BY users.name, users.email, orders.product_id, orders.quantity
            `)

        res.send(result.rows[0])
    } catch(err){

        res.send("Error: " + err.message)
    }
}