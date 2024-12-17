import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './users.model';
import { SharingModule } from 'src/common/sharing.module';

@Module({
  imports: [MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}]), SharingModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
