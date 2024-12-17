import { Injectable } from '@nestjs/common';
import { CreateGameRoomDto } from './dto/create-game-room.dto';
import { UpdateGameRoomDto } from './dto/update-game-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { GameRoom, GameRoomDocument } from './game.model';
import { Model, Types } from 'mongoose';
import { ConfigService } from 'src/common/config/config.service';

@Injectable()
export class GameRoomService {
  constructor(
    @InjectModel(GameRoom.name) private gameRoomModel: Model<GameRoomDocument>,
    private configService: ConfigService,
  ) {}

  create(createGameRoomDto: CreateGameRoomDto) {
    const group1Id = Array.isArray(createGameRoomDto.group_name1)
      ? createGameRoomDto.group_name1.map(
          (group11) => new Types.ObjectId(group11),
        )
      : [];

    const group2Id = Array.isArray(createGameRoomDto.group_name2)
      ? createGameRoomDto.group_name2.map(
          (group22) => new Types.ObjectId(group22),
        )
      : [];

    return this.gameRoomModel.create({
      ...createGameRoomDto,
      group_name1: group1Id,
      group_name2: group2Id,
    });
  }

  findAll() {
    return this.gameRoomModel.aggregate([{
      $lookup: {
        from: 'users',
        localField: 'group_name1',
        foreignField: '_id',
        as: 'group1_users'
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'group_name2',
        foreignField: '_id',
        as: 'group2_users'
      },
    }

  ]);
  }

  findOne(id: string) {
    return this.gameRoomModel.findById(id);
  }

  update(id: string, updateGameRoomDto: UpdateGameRoomDto) {
    const updateData = {
      ...updateGameRoomDto,
      group_name1: Array.isArray(updateGameRoomDto.group_name1)
        ? updateGameRoomDto.group_name1.map((group) => Types.ObjectId.isValid(group) ? new Types.ObjectId(group) : group)
        : [],
      group_name2: Array.isArray(updateGameRoomDto.group_name2)
        ? updateGameRoomDto.group_name2.map((group) => Types.ObjectId.isValid(group) ? new Types.ObjectId(group) : group)
        : [],
    };
    return this.gameRoomModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  remove(id: string) {
    return this.gameRoomModel.findByIdAndDelete(id);
  }
}
