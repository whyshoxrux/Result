import { pool } from "../../common/database/database.service.js";

export async function add(req, res) {
  try {
    const newData = req.body;
    const result = await pool.query(
      `
            INSERT INTO products (name, description, price, seller_id, createdAt, updatedAt) 
            VALUES ($1,$2,$3,$4,$5,$6) RETURNING *
            `,

      [newData.name, newData.description, newData.price, newData.seller_id, newData.createdAt, newData.updatedAt]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.send("Productsni qo'shishda xatolik: " + err.message);
  }
}

export async function get(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
            SELECT * FROM products WHERE id=$1
            `,
      [id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.send("Productsni olishda xatolik: " + err.message);
  }
}

export async function getAll(req, res) {
  try {
    const result = await pool.query(`
        SELECT * FROM products
        `)

        res.send(result.rows)
  } catch (err) {
    res.send("Products ni olishda xatolik: " + err.message);
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const newData = req.body;

    const oldCustomer = await pool.query(
      `
            SELECT * FROM products WHERE id = $1
            `,
      [id]
    );
    const { name, description, price, seller_id, createdAt, updatedAt } = {
      ...oldCustomer[0],
      ...newData,
    };

    const result = await pool.query(
      `
            UPDATE products SET name=$1, description=$2, price=$3, seller_id=$4, createdAt=$5, updatedAt=$6
            WHERE id=$7 RETURNING *
            `,
      [name, description, price, seller_id, createdAt, updatedAt, id]
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
            DELETE FROM products WHERE id = $1
            `,
      [id]
    );
    res.send("products muvaffaqiyatli o'chirildi🫡");
  } catch (err) {
    res.send("productsni o'chirishda xatolik: " + err.message);
  }
}
