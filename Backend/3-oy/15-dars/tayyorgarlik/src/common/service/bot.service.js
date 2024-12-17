import TelegramBot from "node-telegram-bot-api";
import getConfig from "../config/config.service.js";
import { findUserByPhone } from "../../core/user/user.service.js";

const token = getConfig("BOT_TOKEN");

export const bot = new TelegramBot(token, {polling: true});

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
  
      bot.sendMessage(chat_id, "1 daqiqa kuting, malumotlaringiz yangilanmoqda...");
  
      setTimeout(async () => {
        try {
          const result = await UserModel.update(
            { telegram_id: user_id },
            { where: { phone: phone_number } }
          );
  
          if (result[0] === 1) {
            bot.sendMessage(chat_id, "Malumotlar yangilandi");
          } else {
            bot.sendMessage(chat_id, "Yangilashda xatolik yuz berdi.");
          }
        } catch (err) {
          console.error("Error updating user:", err);
          bot.sendMessage(chat_id, "Serverda xatolik yuz berdi: " + err.message);
        }
      }, 60000);
    });
  }
  