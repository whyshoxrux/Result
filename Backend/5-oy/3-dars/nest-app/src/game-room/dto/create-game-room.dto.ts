import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateGameRoomDto {

  @IsString()
  @IsNotEmpty()
  room_name: string;

  @IsString()
  @IsNotEmpty()
  game_owner: string;

  @IsArray()
  @IsNotEmpty()
  group_name1: Types.ObjectId;

  @IsArray()
  @IsNotEmpty()
  group_name2: Types.ObjectId;
}

