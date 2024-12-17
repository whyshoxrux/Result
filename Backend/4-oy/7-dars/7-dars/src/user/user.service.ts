import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getAllUser(){
    throw new ForbiddenException("Huquqiz yetarlimas")
  }
}
