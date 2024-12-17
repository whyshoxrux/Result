import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getHello() {
    const result = await this.userService.getHello();
    return result;
  }

  @Post()
  async getGoodbye() {
    const result = await this.userService.getGoodbye();
    return result;
  }

  @Get('shoxrux')
  async getShoxrux() {
    const result = await this.userService.getShoxrux();
    return result;
  }

  @Get('domla')
  async getDomla() {
    const result = await this.userService.getDomla();
    return result;
  }

  @Put()
  async updateVazifa() {
    const result = await this.userService.updateVazifa();
    return result;
  }

  @Delete()
  async deleteVazifa(){
    const result = await this.userService.deleteVazifa();
    return result;
  }

  @Put()
  async updateHomework(){
    const result = await this.userService.updateHomework();
    return result
  }
}
