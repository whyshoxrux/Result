import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserChema } from './user.model';

@Module({
  imports:[MongooseModule.forFeature([{name: User.name, schema:UserChema}])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
