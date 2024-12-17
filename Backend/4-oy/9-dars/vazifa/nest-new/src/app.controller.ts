import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(AppService)
  @Get()
  get(): string {
    return;
  }
  
  @Post()
  post(): string{
    return;
  }
}
