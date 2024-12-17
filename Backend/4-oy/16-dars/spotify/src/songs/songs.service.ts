import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Song } from './song.model';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Genre } from 'src/genres/genre.model';

@Injectable()
export class SongsService {
  constructor(
    @InjectModel(Song)
    private songModel: typeof Song,
  ) {}

  async createSong(dto: CreateSongDto): Promise<Song> {
    return this.songModel.create(dto);
  }

  async getAllSongs(): Promise<Song[]> {
    return this.songModel.findAll({
      include: [
        { model: Genre, attributes: ['name'], through: { attributes: [] } }
      ]
    });
  }

  async getSongById(id: number): Promise<Song> {
    const song = await this.songModel.findByPk(id, {
      include: [
        { model: Genre, attributes: ['name'], through: { attributes: [] } }
      ]
    });
    if (!song) {
      throw new NotFoundException('Song not found');
    }
    return song;
  }

  async updateSong(id: number, dto: UpdateSongDto): Promise<[number, Song[]]> {
    const [updatedRows, [updatedSong]] = await this.songModel.update(dto, {
      where: { id },
      returning: true,
    });

    if (updatedRows === 0) {
      throw new NotFoundException('Song not found');
    }

    return [updatedRows, [updatedSong]];
  }

  async deleteSong(id: number): Promise<void> {
    const song = await this.getSongById(id);
    await song.destroy();
  }
}
