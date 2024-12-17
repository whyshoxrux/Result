import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Controller('playlist')
export class PlaylistsController {
  constructor(private playlistService: PlaylistsService) {}

  @Post()
  async createPlaylist(@Body() dto: CreatePlaylistDto) {
    return this.playlistService.createPlaylist(dto);
  }

  @Get()
  async getAllPlaylists() {
    return this.playlistService.getAllPlaylists();
  }

  @Get(':id')
  async getPlaylistById(@Param('id') id: number) {
    return this.playlistService.getPlaylistById(id);
  }

  @Put(':id')
  async updatePlaylist(
    @Param('id') id: number,
    @Body() dto: UpdatePlaylistDto,
  ) {
    return this.playlistService.updatePlaylist(id, dto);
  }

  @Delete(':id')
  async deletePlaylist(@Param('id') id: number) {
    return this.playlistService.deletePlaylist(id);
  }
}
