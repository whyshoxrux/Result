import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PlaylistsongsService } from './playlistsongs.service';
import { CreatePlaylistsongDto } from './dto/create-playlistsong.dto';
import { UpdatePlaylistsongDto } from './dto/update-playlistsong.dto';

@Controller('playlistsongs')
export class PlaylistsongsController {
  constructor(private readonly playlistsongsService: PlaylistsongsService) {}

  @Post()
  create(@Body() createPlaylistsongDto: CreatePlaylistsongDto) {
    return this.playlistsongsService.create(createPlaylistsongDto);
  }

  @Get()
  findAll() {
    return this.playlistsongsService.findAll();
  }

  @Get(':id')
  findOne(@Param('playlistId') playlistId: string) {
    return this.playlistsongsService.findOne(+playlistId);
  }

  @Put(':id')
  update(
    @Param('id') playlistId: number,
    @Body() updatePlaylistsongDto: UpdatePlaylistsongDto,
  ) {
    return this.playlistsongsService.update(+playlistId, updatePlaylistsongDto);
  }

  @Delete(':id')
  remove(@Param('id') playlistId: number) {
    return this.playlistsongsService.remove(+playlistId);
  }
}
