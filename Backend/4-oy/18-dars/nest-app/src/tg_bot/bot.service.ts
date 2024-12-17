import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { CallbackQuery } from 'telegraf/typings/core/types/typegram';

interface User {
  id: string;
  name: string;
}

interface Queue {
  users: User[];
}

@Injectable()
export class BotService {
  private queues: { [service: string]: Queue } = {
    'Valyuta ayirboshlash': { users: [] },
    Kredit: { users: [] },
    Avtokredit: { users: [] },
    'Plastik karta olish': { users: [] },
  };

  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {
    this.bot.start((ctx) => {
      console.log(this.queues['Kredit'].users);

      ctx.reply('Bankga xush kelibsiz, xizmat tanlang:', {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Valyuta ayirboshlash',
                callback_data: 'Valyuta ayirboshlash',
              },
            ],
            [{ text: 'Kredit', callback_data: 'Kredit' }],
            [{ text: 'Avtokredit', callback_data: 'Avtokredit' }],
            [
              {
                text: 'Plastik karta olish',
                callback_data: 'Plastik karta olish',
              },
            ],
          ],
        },
      });
    });

    this.bot.on('callback_query', (ctx) => {
      const callbackQuery = ctx.callbackQuery as CallbackQuery.DataQuery;
      const service = callbackQuery.data;
      const userId = ctx.from.id.toString();
      const userName = ctx.from.first_name;

      const message = this.addToQueue(service, userId, userName);
      ctx.reply(message);

      ctx.answerCbQuery();
    });
  }

  addToQueue(service: string, userId: string, userName: string): string {
    if (this.queues[service]) {
      const userExists = this.queues[service].users.find(
        (user) => user.id === userId,
      );

      if (!userExists) {
        this.queues[service].users.push({ id: userId, name: userName });
        const position = this.queues[service].users.length; 
        const remaining = position - 1; 

        return `${userName}, siz ${service} xizmatida ${position}-navbatdasiz. Sizdan oldin ${remaining} odam qoldi.`;
      } else {
        return `${userName}, siz allaqachon navbatdasiz.`;
      }
    } else {
      return `Xizmat topilmadi: ${service}`;
    }
  }

  processFromPostman(service: string): string {
    if (this.queues[service]) {
      const users = this.queues[service].users;
      console.log(users);

      if (users.length > 0) {
        const currentUser = users.shift(); 

        if (currentUser) {
          const userId = currentUser.id;
          const userName = currentUser.name;

          this.bot.telegram.sendMessage(
            userId,
            `${userName}, sizning navbatingiz keldi!`,
          );
        }

        for (let i = 0; i < users.length; i++) {
          const userId = users[i].id;
          const userName = users[i].name;
          const position = i + 1; 

          this.bot.telegram.sendMessage(
            userId,
            `${userName}, sizning navbatingiz ${position}. Sizdan oldin ${i} odam qoldi.`,
          );

          console.log(users[i]);
        }

        return `Xizmat bo'yicha 1-navbatdagi foydalanuvchiga habar yuborildi: ${service}`;
      } else {
        return `Xizmatda boshqa foydalanuvchi qolmagan: ${service}`;
      }
    } else {
      return `Xizmat topilmadi: ${service}`;
    }
  }
}
