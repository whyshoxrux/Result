import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppService implements NestInterceptor {
  private random: number;
  private lastUpdate: number;

  constructor(){
    this.random = Math.round(Math.random() * 100) + 1;
    this.lastUpdate = Date.now();

  }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>{
    const currentTime = Date.now();
    const oneMinute = 60 * 1000;

    if(currentTime - this.lastUpdate >= oneMinute){
      this.random = Math.floor(Math.random() * 100) + 1;
      this.lastUpdate = currentTime;
    }
    
    return of(this.random)
  }
}
