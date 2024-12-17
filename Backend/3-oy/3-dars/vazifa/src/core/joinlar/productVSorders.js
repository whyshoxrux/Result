import { pool } from "../../common/database/database.service.js";

export async function productVsorder(req, res) {
  try {
    const result = await pool.query(`
            SELECT products.name,
            products.price,
            orders.product_id,
            orders.quantity
            FROM orders
            LEFT JOIN products
            ON orders.product_id = products.id
            GROUP BY products.name, products.price, orders.product_id, orders.quantity
            `);
    res.send(result.rows[0]);
  } catch (err) {
    res.send("Error: " + err.message);
  }
}
