import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Playlist } from './playlist.model';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { User } from 'src/users/user.model';
import { Song } from 'src/songs/song.model';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectModel(Playlist)
    private playlistModel: typeof Playlist,
  ) { }

  async createPlaylist(dto: CreatePlaylistDto): Promise<Playlist> {
    return this.playlistModel.create(dto);
  }

  async getAllPlaylists(): Promise<Playlist[]> {
    return this.playlistModel.findAll({
      include: [
        {
          model: Song,
          through: { attributes: [] },
          attributes: ['title', 'duration']
        },
        {
          model: User,
          attributes: ['username', 'email']
        }
      ],
    });
  }


  async getPlaylistById(id: number): Promise<Playlist> {
    const playlist = await this.playlistModel.findByPk(id, { include: { model: User, attributes: ['username', 'email'] } });
    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }
    return playlist;
  }

  async updatePlaylist(id: number, dto: UpdatePlaylistDto): Promise<[number, Playlist[]]> {
    const [updatedRows, [updatedPlaylist]] = await this.playlistModel.update(dto, {
      where: { id },
      returning: true,
    });

    if (updatedRows === 0) {
      throw new NotFoundException('Playlist not found');
    }

    return [updatedRows, [updatedPlaylist]];
  }

  async deletePlaylist(id: number): Promise<void> {
    const playlist = await this.getPlaylistById(id);
    await playlist.destroy();
  }
}
