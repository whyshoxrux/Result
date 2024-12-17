import TelegramBot from "node-telegram-bot-api";
import getConfig from "../config/config.service.js";
import { findUserByPhone } from "../../core/user/user.service.js";
import UserModel from "../../core/user/user.model.js";

const token = getConfig("BOT_TOKEN");

export const bot = new TelegramBot(token, { polling: true });

export function listenBot() {
  bot.on("message", (msg) => {
    const chat_id = msg.chat.id;
    bot.sendMessage(chat_id, "Davom etish uchun kontakt bilan bolishing", {
      reply_markup: {
        keyboard: [
          [{ text: "Kontakt bilan bolishish", request_contact: true }],
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
      return bot.sendMessage(chat_id, "Oldin websitedan royhatdan oting");
    }
    const result = await UserModel.update(
      { telegram_id: user_id },
      { where: { phone: phone_number } }
    );
    bot.sendMessage(chat_id, "Malumotlar yangilandi");
  });
}
