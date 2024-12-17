import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf, Context } from 'telegraf';
import * as dotenv from 'dotenv';

// .env fayldagi o'zgaruvchilarni yuklash uchun
dotenv.config();

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: Telegraf; // Botni yaratish uchun Telegraf o'zgaruvchisi
  private tasks: { id: number; text: string }[] = []; // Vazifalar ro'yxati, har bir vazifa id va text bilan saqlanadi

  constructor() {
    this.bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN); // Telegram bot tokenini yuklash va Telegraf botini yaratish
  }

  // Bot ishga tushirilganda chaqiriladigan funksiyalar
  onModuleInit() {
    this.initializeBot(); // Botni boshlash uchun funksiya
  }

  // Botni ishga tushirish va komandalarini sozlash uchun asosiy funksiya
  private initializeBot() {
    // Bot start komandasi - foydalanuvchi botga birinchi marta kirganda
    this.bot.start((ctx) => {
      // Foydalanuvchiga xush kelibsiz xabarini yuborish va tugmalar qo'shish
      ctx.reply('👋 Xush kelibsiz! Tugmalardan birini tanlang:', {
        reply_markup: {
          // Inline tugmalarni yaratish
          inline_keyboard: [
            [{ text: '📝 Vazifa qo\'shish', callback_data: 'add_task' }],  // "Vazifa qo'shish" tugmasi
            [{ text: '📋 Vazifalar ro\'yxati', callback_data: 'view_tasks' }], // "Vazifalar ro'yxati" tugmasi
          ],
        },
      });
    });

    // Foydalanuvchi tugmani bosganda "callback_query" ishlatiladi
    this.bot.on('callback_query', async (ctx: Context) => {
      // callback_query obyektini olish
      const callbackQuery = ctx.callbackQuery as any;

      // callbackQuery da 'data' borligini tekshirish
      if ('data' in callbackQuery) {
        // callback_query dan ma'lumotni olish
        const callbackData = callbackQuery.data;

        // Foydalanuvchi "Vazifa qo'shish" tugmasini bosganda
        if (callbackData === 'add_task') {
          // Vazifa qo'shish uchun foydalanuvchiga xabar yuborish
          await ctx.reply('Iltimos, vazifani kiriting:');
          
          // Foydalanuvchi matn (text) yuborganda
          this.bot.on('text', (messageCtx) => {
            const newTask = messageCtx.message.text; // Foydalanuvchi yuborgan matnni olish
            const taskId = this.tasks.length + 1; // Vazifaga yangi id berish (avtomatik ko'tariladi)

            // Yangi vazifani ro'yxatga qo'shish
            this.tasks.push({ id: taskId, text: newTask }); 
            
            // Vazifa muvaffaqiyatli qo'shilgani haqida foydalanuvchiga xabar yuborish
            messageCtx.reply(`✅ Vazifa qo'shildi: "${newTask}"`, {
              reply_markup: {
                inline_keyboard: [
                  [{ text: '📋 Vazifalar ro\'yxatini ko\'rish', callback_data: 'view_tasks' }], // Qo'shilganidan keyin ro'yxatni ko'rish uchun tugma
                ],
              },
            });
          });
        } 
        // Foydalanuvchi "Vazifalar ro'yxati" tugmasini bosganda
        else if (callbackData === 'view_tasks') {
          this.sendTaskList(ctx); // Vazifalar ro'yxatini foydalanuvchiga yuborish uchun funksiya
        } 
        // Foydalanuvchi "O'chirish" tugmasini bosganda
        else if (callbackData.startsWith('delete_')) {
          const taskId = parseInt(callbackData.split('_')[1], 10); // O'chirilishi kerak bo'lgan vazifaning id sini olish
          this.tasks = this.tasks.filter((task) => task.id !== taskId); // Shu id bo'yicha vazifani ro'yxatdan o'chirish
          
          // Vazifa muvaffaqiyatli o'chirilganligi haqida xabar yuborish
          await ctx.reply('🗑️ Vazifa o\'chirildi!');
          this.sendTaskList(ctx); // O'chirilgandan keyin yangilangan ro'yxatni qayta yuborish
        }
      }
    });

    this.bot.launch(); // Botni ishga tushirish
  }

  // Vazifalar ro'yxatini foydalanuvchiga yuborish uchun funksiya
  private sendTaskList(ctx: Context) {
    if (this.tasks.length === 0) {
      // Agar vazifalar bo'lmasa, foydalanuvchiga bu haqda xabar yuborish
      ctx.reply('📭 Hozircha vazifalar ro\'yxati bo\'sh.');
    } else {
      // Agar vazifalar mavjud bo'lsa, ularni foydalanuvchiga ko'rsatish
      let taskMessage = '📋 Sizning vazifalaringiz:\n';
      this.tasks.forEach((task) => {
        taskMessage += `\n${task.id}. ${task.text}`; // Har bir vazifani ro'yxatda ko'rsatish
      });

      // Vazifalar ro'yxatini inline tugmalar bilan yuborish (o'chirish tugmasi)
      ctx.reply(taskMessage, {
        reply_markup: {
          inline_keyboard: [
            ...this.tasks.map((task) => [
              { text: `🗑️ O'chirish: ${task.text}`, callback_data: `delete_${task.id}` }, // Har bir vazifani o'chirish uchun tugma
            ]),
            [{ text: '🔙 Bosh menyuga qaytish', callback_data: 'view_tasks' }], // Bosh menyuga qaytish tugmasi
          ],
        },
      });
    }
  }
}
