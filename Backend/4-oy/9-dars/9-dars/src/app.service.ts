import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): number {
    const randomThreeDigitNumber = Math.floor(Math.random() * 900) + 100;
    return randomThreeDigitNumber;
  }
  add(): number {
    const randomThreeDigitNumber = Math.floor(Math.random() * 900) + 100;
    return randomThreeDigitNumber;
  }
}
