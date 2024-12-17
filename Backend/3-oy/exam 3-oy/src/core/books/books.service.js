import { pool } from "../../common/database/database.service.js";

export async function add(req, res) {
  try {
    const newUser = req.body;
    const result = await pool.query(
      `
            INSERT INTO books (
                title, author, publisher_id, category_id, price
            ) VALUES ($1, $2, $3, $4, $5) RETURNING *
        `,
      [
        newUser.title,
        newUser.author,
        newUser.publisher_id,
        newUser.category_id,
        newUser.price,
      ]
    );
    res.send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.send("Error: " + err.message);
  }
}
export async function getAll(req, res) {
  try {
    const result = await pool.query(`
        SELECT 
          books.id AS book_id, 
          books.title AS book_title, 
          books.author, 
          books.price, 
          publishers.name AS publisher_name, 
          categories.name AS category_name
        FROM books
        LEFT JOIN publishers ON books.publisher_id = publishers.id
        LEFT JOIN categories ON books.category_id = categories.id;
      `);
    res.send(result.rows);
  } catch (error) {
    res.send("Error: " + err.message);
  }
}
export async function get(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT 
          books.id AS book_id, 
          books.title AS book_title, 
          books.author, 
          books.price, 
          publishers.name AS publisher_name, 
          categories.name AS category_name
        FROM books
        LEFT JOIN publishers ON books.publisher_id = publishers.id
        LEFT JOIN categories ON books.category_id = categories.id
         WHERE id=$1`,
      [id]
    );
    res.status(200).send(result.rows[0]);
  } catch (error) {
    res.send("Error: " + err.message);
  }
}
export async function update(req, res) {
  try {
    const { id } = req.params;
    const old = await pool.query(
      `
        SELECT * FROM books WHERE id = $1`,
      [id]
    );
    const newv = req.body;
    const { title, author, publisher_id, category_id, price } = {
      ...old,
      ...newv,
    };
    const result = await pool.query(
      `
        UPDATE books SET title = $1, author = $2, publisher_id = $3, category_id = $4, price = $5 WHERE id = $6
    `,
      [title, author, publisher_id, category_id, price, id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.send("Error: " + err.message);
  }
}

export async function deletee(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `DELETE FROM books WHERE id = $1 RETURNING *`,
      [id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.status(500).send("error: " + err.message);
  }
}
