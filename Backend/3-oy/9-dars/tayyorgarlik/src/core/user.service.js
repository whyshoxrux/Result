import jwt from "jsonwebtoken";
import { getconfig } from "../common/config/config.service.js";

export async function add(req, res, next) {
    const { to, subject, htmlContent } = req.body;
    const a = 1
    a = 2
    try {
        const accessToken = generateAccessToken({ email: to });

        const confirmationLink = `http://localhost:3000/email-acceptance?token=${accessToken}`;
        const emailContent = `
            <h2>${htmlContent}</h2>
            <a href="${confirmationLink}">Emailni tasdiqlash</a>
        `;

        const result = await sendMessage(to, subject, emailContent);
        res.status(200).json({ message: "Email successfully sent", accessToken, result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to send email", error: error.message });
    }
};
function generateAccessToken(data) {
  return jwt.sign(data, getconfig("JWT_ACESS_SECRET"), {
    expiresIn: "15m",
  });
}

// async function findUserByEmail(email) {
//   const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
//     email,
//   ]);
//   return result.rows[0];
// }

// export async function getAll(req, res) {
//   try {
//     const result = await pool.query(`SELECT * FROM users`);
//     res.send(result.rows);
//   } catch (err) {
//     console.log(err.message);
//   }
// }

// export async function findUserByEmail(email) {
//   const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
//     email,
//   ]);
//   return result.rows[0];
// }

// export async function tekshir(req, res, next) {
//   try {
//     const { id } = req.params;
//     const token = jwt.verify(id, getconfig("JWT_ACCESS_SECRET"));
//     await pool.query(
//       `
//             UPDATE users SET email_status=true WHERE email = $1
//             `,
//       [token.email]
//     );
//     const result = await pool.query(`SELECT * FROM users`);
//     res.send(result.rows[0]);
//   } catch (err) {
//     console.log(err);
//   }
// }
