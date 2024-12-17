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

    // Find the user in the database by phone number
    const dbUser = await findUserByPhone(phone_number);
    
    // If the user does not exist in the database
    if (!dbUser) {
      return bot.sendMessage(chat_id, "Oldin websitedan royhatdan oting");
    }

    // Inform the user that the update will occur after 1 minute
    bot.sendMessage(chat_id, "1 daqiqa kuting, malumotlaringiz yangilanmoqda...");

    // Use setTimeout to delay the update by 1 minute
    setTimeout(async () => {
      try {
        // Perform the update after 1 minute
        const result = await UserModel.update(
          { telegram_id: user_id },
          { where: { phone: phone_number } }
        );

        // Notify the user that the information has been updated
        if (result[0] === 1) { // result[0] represents the number of affected rows
          bot.sendMessage(chat_id, "Malumotlar yangilandi");
        } else {
          bot.sendMessage(chat_id, "Yangilashda xatolik yuz berdi.");
        }
      } catch (err) {
        console.error("Error updating user:", err);
        bot.sendMessage(chat_id, "Serverda xatolik yuz berdi: " + err.message);
      }
    }, 60000); // 60000 milliseconds = 1 minute
  });
}
