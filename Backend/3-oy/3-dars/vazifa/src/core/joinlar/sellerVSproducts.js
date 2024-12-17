import { pool } from "../../common/database/database.service.js";

export async function join(req, res){
    try{
        const result = await pool.query(`
            SELECT seller.name AS seller_name,
            seller.shopName,
            products.name,
            products.price
            FROM seller
            RIGHT JOIN
            products
            ON seller.id = products.seller_id
            GROUP BY seller_name, seller.shopName, products.name, products.price
            `)

            res.send(result.rows[0])
    } catch(err){
        res.send("Error: " + err.message)
    }
}