import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(":id")
  createUser(@Param(new ParseIntPipe()) id: number) {
    console.log("Get user", id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto){
    console.log('createUser')
  }
}
