import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import * as dotenv from 'dotenv';
import { TelegrafModule } from 'nestjs-telegraf';
import { QueueController } from './bot.controller';

dotenv.config();

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_TOKEN,
    }),
  ],
  controllers: [QueueController],
  providers: [BotService],
})
export class BotModule {}
