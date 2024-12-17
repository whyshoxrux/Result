import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { RoleGuard } from 'src/common/guard/role.guard';
import { Roles } from 'src/common/guard/roles.decorator';

@Controller('genre')
export class GenresController {
  constructor(private genreService: GenresService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Roles('admin')
  async createGenre(@Body() dto: CreateGenreDto) {
    return this.genreService.createGenre(dto);
  }

  @Get()
  async getAllGenres() {
    return this.genreService.getAllGenres();
  }

  @Get(':id')
  async getGenreById(@Param('id') id: number) {
    return this.genreService.getGenreById(id);
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  @Roles('admin')
  async updateGenre(
    @Param('id') id: number,
    @Body() dto: UpdateGenreDto,
  ) {
    return this.genreService.updateGenre(id, dto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles('admin')
  async deleteGenre(@Param('id') id: number) {
    return this.genreService.deleteGenre(id);
  }
}
