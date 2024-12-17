import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Genres } from './genres.model';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Song } from 'src/songs/songs.model';

@Injectable()
export class GenresService {

  constructor(@InjectModel(Genres) private GenreModel: typeof Genres){}

  create(createGenreDto: CreateGenreDto) {
    return this.GenreModel.create(createGenreDto);
  }

  async findAll() {
    const result = await this.GenreModel.findAll({include: {model: Song, attributes:['title', 'duration'], through: {attributes:[]}}})
    return result
  }

  async findOne(id: number) {
    const result = await this.GenreModel.findOne({});
    return result;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    const result = await this.GenreModel.findByPk(id);
    await result.update(updateGenreDto);
    return result;
  }

  async remove(id: number) {
    const result = await this.GenreModel.findByPk(id);
    await result.destroy();
    return 'Siz eng zo\'risiz🫡'
  }
}
