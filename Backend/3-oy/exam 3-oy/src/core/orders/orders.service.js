import { pool } from "../../common/database/database.service.js";
import CustomError from "../../common/exception/custom.error.js";
import {
  idValidator,
  registerValidator,
} from "./order.validator.js";

export async function add(req, res, next) {
  try {
    const newUser = req.body;
    const { error } = registerValidator.validate(newUser);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const result = await pool.query(
      `
            INSERT INTO orders (
                user_id, book_id, quantity, total_price
            ) VALUES ($1, $2, $3, $4) RETURNING *
        `,
      [newUser.user_id, newUser.book_id, newUser.quantity, newUser.total_price]
    );
    res.send(result.rows[0])
  } catch (error) {
    console.log(error);
    res.send("Error: " + error.message)
  }
}
export async function getAll(req, res) {
  try {
    const result = await pool.query(`
        SELECT 
          orders.id AS order_id, 
          users.name AS user_name, 
          books.title AS book_title, 
          books.author, 
          publishers.name AS publisher_name, 
          categories.name AS category_name, 
          orders.quantity, 
          orders.total_price
        FROM orders
        JOIN users ON orders.user_id = users.id
        JOIN books ON orders.book_id = books.id
        JOIN publishers ON books.publisher_id = publishers.id
        JOIN categories ON books.category_id = categories.id;
      `);
      res.send(result.rows);
  } catch (error) {
    res.send("Error: " + err.message)
  }
}
export async function get(req, res, next) {
    try {
      const { id } = req.params;
  
      const result = await pool.query(`SELECT 
          orders.id AS order_id, 
          users.name AS user_name, 
          books.title AS book_title, 
          books.author, 
          publishers.name AS publisher_name, 
          categories.name AS category_name, 
          orders.quantity, 
          orders.total_price
        FROM orders
        JOIN users ON orders.user_id = users.id
        JOIN books ON orders.book_id = books.id
        JOIN publishers ON books.publisher_id = publishers.id
        JOIN categories ON books.category_id = categories.id
         WHERE id=$1`, [id]);
      res.status(200).send(result.rows[0]);
    } catch (error) {
      next(error);
    }
  }
export async function update(req, res, next) {
  try {
    const { id } = req.params;
    const old = await pool.query(
      `
        SELECT * FROM orders WHERE id = $1`,
      [id]
    );
    const newv = req.body;
    const { user_id, book_id, quantity, total_price } = {
      ...old,
      ...newv,
    };
    const result = await pool.query(
      `
        UPDATE orders SET user_id = $1, book_id = $2, quantity = $3, total_price = $4 WHERE id = $5
    `,
      [user_id, book_id, quantity, total_price, id]
    );
    res.status(200).send("Muvaffaqiyatli yangilandi");
  } catch (err) {
    console.log(err)
    next(err);
  }
}

export async function deletee(req, res, next) {
  try {
    const { error: errorParams } = idValidator.validate(req.params);
    if (errorParams) {
      return res.status(400).send(errorParams.details[0].message);
    }
    const { id } = req.params;
    const result = await pool.query(
      `DELETE FROM orders WHERE id = $1 RETURNING *`,
      [id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.status(500).send("error: " + err.message);
  }
}
