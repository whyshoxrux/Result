import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'message' })
  handleMessage(payload: any): string {
    console.log('qabul qiluvchi habarni oldi:', payload);
    return 'Habar keldi';
  }
}
