import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PlaylistSongsService } from './playlist-songs.service';
import { CreatePlaylistSongDto } from './dto/create-playlist-song.dto';
import { UpdatePlaylistSongDto } from './dto/update-playlist-song.dto';

@Controller('playlist-song')
export class PlaylistSongsController {
  constructor(private playlistSongService: PlaylistSongsService) {}

  @Post()
  async addSongToPlaylist(@Body() dto: CreatePlaylistSongDto) {
    return this.playlistSongService.addSongToPlaylist(dto);
  }

  @Get()
  async getAllPlaylistSongs() {
    return this.playlistSongService.getAllPlaylistSongs();
  }

  @Get(':id')
  async getPlaylistSongById(@Param('id') id: number) {
    return this.playlistSongService.getPlaylistSongById(id);
  }

  @Put(':id')
  async updatePlaylistSong(
    @Param('id') id: number,
    @Body() dto: UpdatePlaylistSongDto,
  ) {
    return this.playlistSongService.updatePlaylistSong(id, dto);
  }

  @Delete(':id')
  async removeSongFromPlaylist(@Param('id') id: number) {
    return this.playlistSongService.removeSongFromPlaylist(id);
  }
}
