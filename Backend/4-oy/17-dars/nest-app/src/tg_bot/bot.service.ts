import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { CallbackQuery } from 'telegraf/typings/core/types/typegram';

const mep = [
  { uz: 'salom', en: 'hello', ru: 'привет' },
  { uz: 'ona', en: 'mother', ru: 'мама' },
  { uz: 'ota', en: 'father', ru: 'отец' },
  { uz: 'singil', en: 'sister', ru: 'сестра' },
  { uz: 'uka', en: 'brother', ru: 'брат' },
];

@Injectable()
export class BotService {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {
    this.bot.start((ctx) => {
      
      ctx.reply(`Xush kelibsan ${ctx.from.first_name}! Tanla bittasini:`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "O'zbek  > Ingiliz", callback_data: 'uz_en' }],
            [{ text: "O'zbek  > Rus", callback_data: 'uz_ru' }],
            [{ text: "Ingiliz > O'zbek ", callback_data: 'en_uz' }],
            [{ text: 'Ingiliz > Rus', callback_data: 'en_ru' }],
            [{ text: "Rus > O'zbek ", callback_data: 'ru_uz' }],
            [{ text: 'Rus > Ingiliz', callback_data: 'ru_en' }],
          ],
        },
      });
    });

    this.bot.on('callback_query', (ctx) => {
      const callbackQuery = ctx.callbackQuery as CallbackQuery.DataQuery;
      const callbackData = callbackQuery.data;

      console.log(`Callback data: ${callbackData}`);

      ctx.deleteMessage();
      const shundan = callbackData.split('_')[0];
      const shunga = callbackData.split('_')[1];
      this.bot.on('text', (ctx) => {
        const messageText = ctx.message.text;
        console.log(messageText);
        const a = this.traslet(messageText, shundan, shunga);
        ctx.reply(a);
      });

      ctx.answerCbQuery();
    });
  }

  traslet(text: string, dan: string, ga: string) {
    for (let i = 0; i < mep.length; i++) {
      if (mep[i][dan] == text) {
        return mep[i][ga];
      }
    }
  }
}
