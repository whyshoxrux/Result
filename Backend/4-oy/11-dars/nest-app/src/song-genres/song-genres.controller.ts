import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SongGenresService } from './song-genres.service';
import { CreateSongGenresDto } from './dto/create-song-genre.dto';
import { UpdateSongGenreDto } from './dto/update-song-genre.dto';

@Controller('song-genres')
export class SongGenresController {
  constructor(private readonly songGenresService: SongGenresService) {}

  @Post()
  create(@Body() createSongGenreDto: CreateSongGenresDto) {
    return this.songGenresService.create(createSongGenreDto);
  }

  @Get()
  findAll() {
    return this.songGenresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songGenresService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSongGenreDto: UpdateSongGenreDto) {
    return this.songGenresService.update(+id, updateSongGenreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songGenresService.remove(+id);
  }
}
