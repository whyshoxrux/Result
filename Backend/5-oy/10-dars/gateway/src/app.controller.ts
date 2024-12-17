import { Controller, Get } from '@nestjs/common';
import {
  Transport,
  ClientProxyFactory,
  ClientProxy,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URI || 'amqp://localhost:5672'],
        queue: 'main_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  @Get('habar-jonat')
  async sendMessage() {
    const message = { text: 'Salom hammaga!' };
    const response = await this.client
      .send({ cmd: 'message' }, message)
      .toPromise();
    console.log('javob qaytdi:', response);
  }
}
