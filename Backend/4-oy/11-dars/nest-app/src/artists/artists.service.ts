import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Artists } from './artists.model';
import { Album } from 'src/albums/album.model';

@Injectable()
export class ArtistsService {
  constructor(@InjectModel(Artists) private ArtistModel: typeof Artists) {}

  create(createArtistDto: CreateArtistDto) {
    return this.ArtistModel.create(createArtistDto);
  }

  async findAll() {
    const result = await this.ArtistModel.findAll({include: {model: Album, attributes:["title", "releaseDate"]}});
    return result;
  }

  async findOne(id: number) {
    const result = await this.ArtistModel.findOne({include: {model: Album, attributes:["title", "releaseDate"]}});
    return result;
  }

  async update(id: number, updateArtistDto: UpdateArtistDto) {
    const result = await this.ArtistModel.findByPk(id);
    await result.update(updateArtistDto);
    return result;
  }

  async remove(id: number) {
    const result = await this.ArtistModel.findByPk(id);
    await result.destroy();
    return "Siz eng zo'risiz🫡";
  }
}
