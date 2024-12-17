import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SongGenresService } from './song-genres.service';
import { CreateSongGenreDto } from './dto/create-song-genre.dto';
import { UpdateSongGenreDto } from './dto/update-song-genre.dto';

@Controller('song-genre')
export class SongGenresController {
  constructor(private songGenreService: SongGenresService) {}

  @Post()
  async createSongGenre(@Body() dto: CreateSongGenreDto) {
    return this.songGenreService.createSongGenre(dto);
  }

  @Get()
  async getAllSongGenres() {
    return this.songGenreService.getAllSongGenres();
  }

  @Get(':id')
  async getSongGenreById(@Param('id') id: number) {
    return this.songGenreService.getSongGenreById(id);
  }

  @Put(':id')
  async updateSongGenre(
    @Param('id') id: number,
    @Body() dto: UpdateSongGenreDto,
  ) {
    return this.songGenreService.updateSongGenre(id, dto);
  }

  @Delete(':id')
  async deleteSongGenre(@Param('id') id: number) {
    return this.songGenreService.deleteSongGenre(id);
  }
}
