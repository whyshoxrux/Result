import { pool } from "../../common/database/database.service.js"

export async function join(req, res){
    try{
        const result = await pool.query(`
            SELECT users.name,
            users.email,
            seller.name AS seller_name,
            seller.shopname
            FROM seller
            RIGHT JOIN
            users
            ON seller.user_id = users.user_id
            GROUP BY seller_name, seller.shopname,users.name, users.email
            `)
        res.send(result.rows[0])
    } catch(err){
        res.send("Error: " + err.message)
    }
}