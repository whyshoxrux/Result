import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';import { GameRoomService } from './game-room.service';
import { CreateGameRoomDto } from './dto/create-game-room.dto';
import { UpdateGameRoomDto } from './dto/update-game-room.dto';

@Controller('game-room')
export class GameRoomController {
  constructor(private readonly gameRoomService: GameRoomService) {}

  @Post()
  create(@Body() createGameRoomDto: CreateGameRoomDto) {
    return this.gameRoomService.create(createGameRoomDto);
  }

  @Get()
  findAll() {
    return this.gameRoomService.findAll();
  }  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameRoomService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGameRoomDto: UpdateGameRoomDto,
  ) {
    return this.gameRoomService.update(id, updateGameRoomDto);
  }  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameRoomService.remove(id);
  }
}

