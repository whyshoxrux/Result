import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type GameRoomDocument = GameRoom & Document;

@Schema()
export class GameRoom {
  @Prop({ required: true })
  room_name: string;

  @Prop({ required: true })
  game_owner: string;

  @Prop({ type: Types.ObjectId, ref: 'users' })
  group_name1: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'users' })
  group_name2: Types.ObjectId;
}

export const GameRoomSchema = SchemaFactory.createForClass(GameRoom);
