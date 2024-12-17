import { Controller, Post, Body } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly botService: BotService) {}

  @Post('process-queue')
  processQueue(@Body() data: { service: string }) {
    return this.botService.processFromPostman(data.service);
  }
}
