import { Module } from '@nestjs/common';
import { GameRoomService } from './game-room.service';
import { GameRoomController } from './game-room.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GameRoom, GameRoomSchema } from './game.model';
import { SharingModule } from 'src/common/sharing.module';

@Module({
  imports: [MongooseModule.forFeature([{name: GameRoom.name, schema: GameRoomSchema}]), SharingModule],
  controllers: [GameRoomController],
  providers: [GameRoomService],
})
export class GameRoomModule {}
