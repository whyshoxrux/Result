import { pool } from "../../common/database/database.service.js";

export async function add(req, res) {
  try {
    const newData = req.body;
    const result = await pool.query(
      `
            INSERT INTO orders (product_id, user_id, quantity, createdAt, updatedAt) 
            VALUES ($1,$2,$3,$4,$5) RETURNING *
            `,

      [newData.product_id, newData.user_id, newData.quantity, newData.createdAt, newData.updatedAt]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.send("ordersni qo'shishda xatolik: " + err.message);
  }
}

export async function get(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
            SELECT * FROM orders WHERE id=$1
            `,
      [id] 
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.send("ordersni olishda xatolik: " + err.message);
  }
}

export async function getAll(req, res) {
  try {
    const result = await pool.query(`
            SELECT * FROM orders
            `);
    res.send(result.rows);
  } catch (err) {
    res.send("orders ni olishda xatolik: " + err.message);
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const newData = req.body;

    const oldCustomer = await pool.query(
      `
            SELECT * FROM orders WHERE id = $1
            `,
      [id]
    );
    const { product_id, user_id, quantity, createdAt, updatedAt } = { ...oldCustomer[0], ...newData };

    const result = await pool.query(
      `
            UPDATE orders SET product_id=$1, user_id=$2, quantity=$3, createdAt=$4, updatedAt=$5
            WHERE id=$6 RETURNING *
            `,
      [product_id, user_id, quantity, createdAt, updatedAt, id]
    );

    res.send(result.rows[0]);
  } catch (err) {
    res.send("Userni yangilashda xatolik: " + err.message);
  }
}

export async function deletee(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
            DELETE FROM orders WHERE id = $1
            `,
      [id]
    );
    res.send("orders muvaffaqiyatli o'chirildi🫡");
  } catch (err) {
    res.send("ordersni o'chirishda xatolik: " + err.message);
  }
}
