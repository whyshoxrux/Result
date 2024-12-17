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
      configService: ConfigService
    ) {
      super(configService);
    }
  
    canActivate(context: ExecutionContext): boolean {

      const isAuth = super.canActivate(context);
      if (!isAuth) return false;
  
      const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
      if (!requiredRoles) {
        return true;
      }
  
      const request = context.switchToHttp().getRequest();
      console.log(request)

      const user = request.user;
      console.log(user.role)
      if (!requiredRoles.includes(user.role)) {
        throw new ForbiddenException('You do not have the required role to access this resource');
      }
  
      return true;
    }
  }
  