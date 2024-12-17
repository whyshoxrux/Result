import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Song } from './songs.model';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Genres } from 'src/genres/genres.model';

@Injectable()
export class SongsService {

  constructor(@InjectModel(Song) private SongModel: typeof Song){}

  create(createArtistDto: CreateSongDto) {
    return this.SongModel.create(createArtistDto);
  }

  async findAll() {
    const result = await this.SongModel.findAll({include: {model: Genres, attributes:["name"], through: {attributes:[]}}})
    return result
  }

  async findOne(id: number) {
    const result = await this.SongModel.findOne({});
    return result;
  }

  async update(id: number, updateSongDto: UpdateSongDto) {
    const result = await this.SongModel.findByPk(id);
    await result.update(updateSongDto);
    return result;
  }

  async remove(id: number) {
    const result = await this.SongModel.findByPk(id);
    await result.destroy();
    return 'Siz eng zo\'risiz🫡'
  }
}