import { error } from "winston";
import { pool } from "../../common/database/database.service.js";
import { accessLogger, errorLogger } from "../../common/service/logger.service.js";

export async function add(req, res) {
  try {
    
    const a = 1
    a = 2
    res.send("Register ishladi")
  
  } catch (err) {    
    errorLogger.error(

      function errorHandling(err, req, res, next) {
        // Xatoni logga yozish
        console.error(err.stack);
      
        res.status(500).json({
          status: 'error',
          message: 'Something went wrong!',
          error: err.message, 
          
        });
      }
      )
  } 
} 
// export async function getAll(req, res) {
//   try {
//     const result = await pool.query(`
//         SELECT * FROM users
        
//         `);
//     res.send(result.rows);
//   } catch (err) {
//     res.send(res.send("Error " + err.message));
//   }
// }
// export async function get(req, res) {
//   try {
//     const { id } = req.params;
//     const result = await pool.query(
//       `SELECT * FROM users WHERE id = $1`,
//       [id]
//     );
//     res.send(result.rows[0]);
//   } catch (err) {
//     res.send("Error " + err.message);
//   }
// }
// export async function update(req, res) {
//   const { id } = req.params;
//   try {
//     const oldUser = await pool.query(
//       `
//         SELECT * FROM users WHERE id = $1 
//         `,
//       [id]
//     );

//     const newUser = req.body;
//     const { username, email, password} = {
//       ...oldUser.rows[0],
//       ...newUser,
//     };

//     const result = await pool.query(
//       `
//          UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING * 
//         `,
//       [username, email, password, id]
//     );
//     res.send(result.rows[0]);
//   } catch (err) {
//     res.send("Error " + err.message);
//   }
// }
// export async function deletee(req, res) {
//   try {
//     const { id } = req.params;
//     const result = await pool.query(
//       `
//         DELETE FROM users WHERE id=$1  
//         `,
//       [id]
//     );
//     res.send(result.rows[0]);
//   } catch (err) {
//     res.send("Error " + err.message);
//   }
// }
