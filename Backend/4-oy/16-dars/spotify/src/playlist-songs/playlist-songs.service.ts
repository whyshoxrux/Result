import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PlaylistSong } from './playlist-song.model';
import { CreatePlaylistSongDto } from './dto/create-playlist-song.dto';
import { UpdatePlaylistSongDto } from './dto/update-playlist-song.dto';

@Injectable()
export class PlaylistSongsService {
  constructor(
    @InjectModel(PlaylistSong)
    private playlistSongModel: typeof PlaylistSong,
  ) {}

  async addSongToPlaylist(dto: CreatePlaylistSongDto): Promise<PlaylistSong> {
    return this.playlistSongModel.create(dto);
  }

  async getAllPlaylistSongs(): Promise<PlaylistSong[]> {
    return this.playlistSongModel.findAll();
  }

  async getPlaylistSongById(id: number): Promise<PlaylistSong> {
    const playlistSong = await this.playlistSongModel.findByPk(id);
    if (!playlistSong) {
      throw new NotFoundException('Playlist song entry not found');
    }
    return playlistSong;
  }

  async updatePlaylistSong(id: number, dto: UpdatePlaylistSongDto): Promise<[number, PlaylistSong[]]> {
    const [updatedRows, [updatedPlaylistSong]] = await this.playlistSongModel.update(dto, {
      where: { id },
      returning: true,
    });

    if (updatedRows === 0) {
      throw new NotFoundException('Playlist song entry not found');
    }

    return [updatedRows, [updatedPlaylistSong]];
  }

  async removeSongFromPlaylist(id: number): Promise<void> {
    const playlistSong = await this.getPlaylistSongById(id);
    await playlistSong.destroy();
  }
}
