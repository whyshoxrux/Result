import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RandomNumberInterceptor implements NestInterceptor {
  private randomNumber: number;  // Random sonni saqlash uchun
  private lastUpdatedTime: number; // Oxirgi yangilangan vaqtni saqlash

  constructor() {
    this.randomNumber = Math.floor(Math.random() * 100) + 1; // Boshlang'ich random son yaratish
    this.lastUpdatedTime = Date.now(); // Boshlang'ich vaqt
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const currentTime = Date.now();
    const oneMinute = 60 * 1000; // 1 daqiqa (millisoniya)

    // 1 daqiqa o'tib ketgan bo'lsa, random sonni yangilash
    if (currentTime - this.lastUpdatedTime >= oneMinute) {
      this.randomNumber = Math.floor(Math.random() * 100) + 1;
      this.lastUpdatedTime = currentTime; // Oxirgi yangilanish vaqtini yangilash
    }

    // Random sonni qaytarish
    return of(this.randomNumber);
  }
}
