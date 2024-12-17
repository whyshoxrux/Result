import { Module } from '@nestjs/common';
import { TelegramService } from './app.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TelegramService],
})
export class AppModule {}
