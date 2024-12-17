import { pool } from "../../common/database/database.service.js";

export async function add(req, res) {
  try {
    const newData = req.body;
    const result = await pool.query(
      `
            INSERT INTO seller (name, shopName, contactInfo, user_id) 
            VALUES ($1,$2,$3,$4) RETURNING *
            `,
      [newData.name, newData.shopName, newData.contactInfo, newData.user_id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.send("Sellerni qo'shishda xatolik: " + err.message);
  }
}

export async function get(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
            SELECT * FROM seller WHERE id=$1
            `,
      [id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.send("Sellerni olishda xatolik: " + err.message);
  }
}

export async function getAll(req, res) {
  try {
    const result = await pool.query(`
        SELECT * FROM seller
        `)
    res.send(result.rows)
  } catch (err) {
    res.send("Sellers ni olishda xatolik: " + err.message);
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const newData = req.body;

    const oldCustomer = await pool.query(
      `
            SELECT * FROM seller WHERE id = $1
            `,
      [id]
    );
    const { name, shopName, contactInfo, user_id, createdAt, updatedAt } = {
      ...oldCustomer[0],
      ...newData,
    };

    const result = await pool.query(
      `
            UPDATE seller SET name=$1, shopName=$2, contactInfo=$3, user_id=$4, createdAt=$5, updatedAt=$6
            WHERE id=$7 RETURNING *
            `,
      [name, shopName, contactInfo, user_id, createdAt, updatedAt, id]
    );

    res.send(result.rows[0]);
  } catch (err) {
    res.send("Userni yangilashda xatolik: " + err.message);
    console.log(err);
  }
}

export async function deletee(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
            DELETE FROM seller WHERE id = $1
            `,
      [id]
    );
    res.send("Seller muvaffaqiyatli o'chirildi🫡");
  } catch (err) {
    res.send("Sellerni o'chirishda xatolik: " + err.message);
  }
}
