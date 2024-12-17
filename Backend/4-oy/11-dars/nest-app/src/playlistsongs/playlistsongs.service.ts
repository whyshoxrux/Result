import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePlaylistsongDto } from './dto/create-playlistsong.dto';
import { UpdatePlaylistsongDto } from './dto/update-playlistsong.dto';
import { PlaylistSong } from './playlistsongs.model';
import { Playlists } from 'src/playlists/playlists.model';

@Injectable()
export class PlaylistsongsService {
  constructor(@InjectModel(PlaylistSong) private readonly playlistSongModel: typeof PlaylistSong) {}

  async create(createPlaylistsongDto: CreatePlaylistsongDto) {
    return await this.playlistSongModel.create(createPlaylistsongDto);
  }

  async findAll() {
    return await this.playlistSongModel.findAll({include: {model:Playlists, attributes: ['name']}});
  }

  async findOne(id: number) {
    const playlistSong = await this.playlistSongModel.findOne({
      where: { id},
    });
    if (!playlistSong) {
      throw new NotFoundException(`PlaylistSong with ID ${id} not found`);
    }
    return playlistSong;
  }

  async update(id: number, updatePlaylistsongDto: UpdatePlaylistsongDto) {
    const [numberOfAffectedRows, [updatedPlaylistSong]] = await this.playlistSongModel.update(updatePlaylistsongDto, {
      where: { id },
      returning: true,
    });
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`PlaylistSong with ID ${id} not found`);
    }
    console.log(1)
    return updatedPlaylistSong;
  }

  async remove(playlistId: number) {
    const playlistSong = await this.findOne(playlistId);
    await playlistSong.destroy();
    return { message: `PlaylistSong with Playlist ID ${playlistId} has been deleted` };
  }
}
