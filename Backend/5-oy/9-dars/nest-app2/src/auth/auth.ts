import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      console.log('Hello Guard!');

      const request = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse();
      const token = request.headers['authorization']?.split(' ')[1];

      if (!token) {
        response.status(401).send('Token yoq');
        return false;
      }

      const result = jwt.verify(token, 'shdnakjlfsdnmawliefn');
      console.log(result.email);

      let userResult = await fetch(
        `http://localhost:3000/users/${result.email}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer your-token-here',
          },
        },
      );
      request.user = await userResult.json();
      console.log(request.user);

      return true;
    } catch (error) {
      console.error('Xato:', error);
      return false;
    }
  }
}
