import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSongGenresDto } from './dto/create-song-genre.dto';
import { UpdateSongGenreDto } from './dto/update-song-genre.dto';
import { SongGenres } from './song-genres.model';

@Injectable()
export class SongGenresService {
  constructor(
    @InjectModel(SongGenres) private songGenresModel: typeof SongGenres,
  ) {}

  create(createSongGenresDto: CreateSongGenresDto) {
    console.log(1)
    return this.songGenresModel.create(createSongGenresDto);
  }

  async findAll() {
    const result = await this.songGenresModel.findAll({});
    return result;
  }

  async findOne(id: number) {
    const result = await this.songGenresModel.findOne({});
    return result;
  }

  async update(id: number, updateSongGenreDto: UpdateSongGenreDto) {
    const result = await this.songGenresModel.findByPk(id);
    await result.update(updateSongGenreDto);
    return result;
  }

  async remove(id: number) {
    const result = await this.songGenresModel.findByPk(id);
    await result.destroy();
    return "Siz eng zo'risiz🫡";
  }
}
