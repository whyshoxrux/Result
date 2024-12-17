import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}



interface Uchish{
  uchish(): void;
}

interface Uzatish{
  dvigatelniYoqish(): void;
  dvigatelniOchirish(): void;
}

class Dron implements Uchish, Uzatish{
  uchish(): void {
    console.log('Dron uchmoqda')
  }

  dvigatelniYoqish(): void {
    console.log("Dvigatel yoqildi")
  }

  dvigatelniOchirish(): void {
    console.log('Dvigatel ochirildi')
  }
}

// const dron = new Dron()

// dron.uchish();
// dron.dvigatelniYoqish();
// dron.dvigatelniOchirish();