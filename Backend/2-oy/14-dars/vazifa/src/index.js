//? ///////////////////////////////////////////////////////////////////////     Transactions     //////////////////////////////////////////////////

// import pkg from "pg";
// const { Pool } = pkg;

// const pool = new Pool({
//   database: "postgres",
//   user: "postgres",
//   password: "123456",
//   host: "127.0.0.1",
//   port: 5432,
// });

// async function connectToDb() {
//   try {
//     await pool.connect();
//     console.log("Bazaga ulandi");
//   } catch (err) {
//     console.log("Bazaga ulanishda hatolik boldi", err.message);
//   }
// }

// async function init() {
//   try {
//     await connectToDb();

//     await pool.query(
//       `
//             CREATE TABLE  IF NOT EXISTS users(
//                 id SERIAL PRIMARY KEY,
//                 account FLOAT
//             )
//         `
//     );

//     // await pool.query(
//     //   `
//     //         INSERT INTO users (account) VALUES
//     //         (0), (0)
//     //     `
//     // );
//     await pool.query(`UPDATE  users SET account=$1 WHERE id=$2`, [100, 1]);
//     const otkazishSummasi = 1;
//     const money = await pool.query(`SELECT account FROM users WHERE id=$1`, [
//       1,
//     ]);
//     if (money.rows[0].account >= otkazishSummasi) {
//       await pool.query("BEGIN");
//       console.log("Tranzaksiya boshlandi");
//       const yechildi1 = await pool.query(
//         `UPDATE users SET account = account - $1 WHERE id=$2`,
//         [otkazishSummasi, 1]
//       );
//       console.log("yechildi1", yechildi1.rows[0]);
//       await pool.query(`UPDATE users SET account = account + $1 WHERE id=$2`, [
//         otkazishSummasi,
//         2,
//       ]);

//       await pool.query("COMMIT");

//       console.log("Tranzaksiya muvaffaqiyatli tugadi");
//     } else {
//       console.log("Hisobda mablag yetarli emas");
//     }

//     const users = await pool.query(`SELECT * FROM users ORDER BY id ASC`);
//     console.log("users", users.rows);
//   } catch (err) {
//     await pool.query("ROLLBACK");
//     console.log("Tranzaksiya hato boldi va boshlangich holatga qaydi");
//     console.log("hato boldi", err.message);
//   }
// }

// init();
//? ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import express from "express";
import { getconfig } from "./common/config/config.js";
import { initDatabase } from "./common/database/database.service.js";
import userRouter from "./controller/user.controller.js"
import balanceRouter from "./controller/balance.controller.js"
import transactionRouter from "./controller/transaction.controller.js"

const app = express();
const PORT = getconfig("EXPRESS_PORT") || 3000;

function initRoutes() {
    app.use("/user", userRouter);
    app.use("/balance", balanceRouter)
    app.use("/transaction", transactionRouter)
}

async function init() {
  app.use(express.json());

  initRoutes();
  await initDatabase();

  app.listen(PORT, () => console.log(`Server ${PORT} da ishladi`));
}

init();
