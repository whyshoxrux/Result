import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const request = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse();
      const token = request.headers['authorization']?.split(' ')[1];

      console.log('token', token);

      if (!token) {
        response.status(401).json({
          message: 'Kalit berilmagan',
          error: 'Unauthorized',
          statusCode: 401,
        });
      }
      const result = jwt.verify(token, this.configService.get('SECRET'));
      request.user = result;
      return true;
    } catch (err) {
      throw new ForbiddenException('Kalit eskirgan');
    }
  }
}
