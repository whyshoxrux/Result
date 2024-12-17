import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { TimeInterceptor } from './common/interceptor/time.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(TimeInterceptor)
  getHello(): number {
    return this.appService.getHello();
  }

  @Post()
  @UseInterceptors(TimeInterceptor)
  post(): number {
    return this.appService.add();
  }
}
