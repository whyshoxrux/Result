import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { ConfigService } from '../config/config.service';

@Injectable()
export class RoleGuard extends AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    configService: ConfigService,
  ) {
    super(configService);
  }

  canActivate(context: ExecutionContext){
    const isAuth = super.canActivate(context);
    if (!isAuth) return false;

    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Huquqinggiz yetarli emas');
    }

    return true;
  }
}
