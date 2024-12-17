import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log("So'rov keldi", request.url);
    const start = Date.now();

    return next.handle().pipe(
      tap(() =>
        console.log(request.url + "So'rov tugadi time:" + (Date.now() - start)),
      ),
    );
  }
}
