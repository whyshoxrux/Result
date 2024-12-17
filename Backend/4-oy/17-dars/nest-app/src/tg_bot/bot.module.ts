import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import * as dotenv from 'dotenv';
import { TelegrafModule } from 'nestjs-telegraf';

dotenv.config();

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_TOKEN,
    }),
  ],
  providers: [BotService],
})
export class BotModule {}
