import { Module } from '@nestjs/common';
import { RandomController } from './app.controller';
import { RandomNumberInterceptor } from './app.service';

@Module({
  imports: [],
  controllers: [RandomController],
  providers: [RandomNumberInterceptor],
})
export class AppModule {}
