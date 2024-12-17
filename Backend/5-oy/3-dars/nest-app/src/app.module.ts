import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GameRoomModule } from './game-room/game-room.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/najottalim'),
    AuthModule,
    UsersModule,
    GameRoomModule
  ],
})
export class AppModule {}
