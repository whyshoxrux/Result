import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Playlists } from './playlists.model';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(@InjectModel(Playlists) private PlaylistModel: typeof Playlists) {}

  create(createPlaylistDto: CreatePlaylistDto) {
    return this.PlaylistModel.create(createPlaylistDto);
  }

  async findAll() {
    const result = await this.PlaylistModel.findAll({});
    return result;
  }

  async findOne(id: number) {
    const result = await this.PlaylistModel.findOne({});
    return result;
  }

  async update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    const result = await this.PlaylistModel.findByPk(id);
    await result.update(updatePlaylistDto);
    return result;
  }

  async remove(id: number) {
    const result = await this.PlaylistModel.findByPk(id);
    await result.destroy();
    return "Siz eng zo'risiz🫡";
  }
}
