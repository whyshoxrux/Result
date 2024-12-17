import TelegramBot from "node-telegram-bot-api";
import getConfig from "../config/config.service.js";
import { findUserByPhone } from "../../core/user/user.service.js";
import { pool } from "../database/database.service.js";

const token = getConfig("BOT_TOKEN");

export const bot = new TelegramBot(token, { polling: true });

export function listenBot() {
  bot.on("message", (msg) => {
    const chat_id = msg.chat.id;
    bot.sendMessage(chat_id, "Davom etish uchun kontakt bilan bo'lishing", {
      reply_markup: {
        keyboard: [
          [{ text: "Kontakt bilan bo'lishish", request_contact: true }],
        ],
        resize_keyboard: true,
      },
    });
  });
  bot.on("contact", async (msg) => {
    const chat_id = msg.chat.id;
    const { phone_number, user_id } = msg.contact;

    const dbUser = await findUserByPhone(phone_number);
    if (!dbUser) {
      return bot.sendMessage(chat_id, "Avval webSite dan ro'yxatdan o'ting");
    }
    const { id } = req.params;
    const old = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
    const neww = req.body;
    const { first_name, second_name, phone, password, balance, telegram_id } = {
      ...old,
      ...neww,
    };

    const result = await pool.query(
      `
        UPDATE users SET first_name = $1, second_name = $2, phone = $3, password = $4, balance = $5, telegram_id = 6 WHERE id = $1
        `,
      [first_name, second_name, phone, password, balance, telegram_id, id]
    );
    bot.sendMessage
    (chat_id, "Ma'lumotlar yangilandi")
  });
}
