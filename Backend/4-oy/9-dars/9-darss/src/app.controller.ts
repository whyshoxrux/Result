import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { RandomNumberInterceptor } from './app.service';

@Controller()
export class RandomController {
  
  @UseInterceptors(RandomNumberInterceptor)
  @Get()
  getRandomNumber() {
    // RandomNumberInterceptor random sonni qaytaradi
    return;
  }
}

