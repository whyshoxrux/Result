import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
const obj = {};
@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log('Sorov keldi', request.url);
    const key = request.url + '-' + request.method;
    const start = Date.now();

    if (!obj[key] || start - obj[key].Time > 60000) {
      return next.handle().pipe(
        tap((number) => {
          obj[key] = { Number: number, Time: new Date() };
        }),
      );
    }
    return of(obj[key].Number);
  }
}
