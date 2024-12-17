import { pool } from "../../common/database/database.service.js";

export async function addTransaction(req, res) {
  try {
    const { from_user_id, to_user_id, amount } = req.body;
        await pool.query(
        
        
      `INSERT INTO transactions(from_user_id, to_user_id, amount) VALUES(
            $1, $2, $3)`,
      [from_user_id, to_user_id, amount]
    );
    
    await pool.query(`BEGIN`);
    
    const userBalance = await pool.query(
      `SELECT balance FROM users WHERE id=$1`,
      [from_user_id]
    );
    if (userBalance.rows[0].balance >= amount) {
        await pool.query(
          `UPDATE users SET balance = balance - $1 WHERE id = $2`,
          [amount, from_user_id]
        );
      
      

      await pool.query(`UPDATE users SET balance = balance + $1 WHERE id=$2`, [
        amount,
        to_user_id
      ]);

      await pool.query(`COMMIT`);
      return res.send("Mablag otkazildi");
    } else {
      await pool.query(`ROLLBACK`);
      res.send("Pul yoq");
    }
  } catch (err) {
    await pool.query(`ROLLBACK`);
    console.log( err );
    
    res.send("Transaction xatosi: " + err.message );
  }
}
export async function getAllTransaction(res, req) {
  try {
    const result = await pool.query(
      `SELECT transactions.id AS Tranzaksiya_id_si,
            transactions.from_user_id,
            users.name,
            transactions.to_user_id,
            transactions.amount
            FROM users
            JOIN
            transactions
            ON
            users.id = transactions.from_user_id
            `
    );
    res.send(result.rows);
  } catch (err) {
    res.send("Tranzaksiyani olishda: " + err.message);
  }
}
export async function getTransaction(res, req) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT transactions.id AS Tranzaksiya_id_si,
                users.id AS from_user_id,
                users.name,
                transactions.to_user_id,
                transactions.amount
                FROM users
                JOIN transactions ON users.id = transactions.from_user_id
                WHERE transactions.id = $1
            
            
            `,
      [id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.send("Tranzaksiyani olishda xato: " + err.message);
  }
}
