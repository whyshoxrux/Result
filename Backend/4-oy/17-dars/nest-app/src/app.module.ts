import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './tg_bot/bot.module';

@Module({
  imports: [BotModule],
})
export class AppModule {}
