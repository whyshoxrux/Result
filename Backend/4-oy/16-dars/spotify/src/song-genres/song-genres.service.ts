import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SongGenre } from './song-genre.model';
import { CreateSongGenreDto } from './dto/create-song-genre.dto';
import { UpdateSongGenreDto } from './dto/update-song-genre.dto';
import { Song } from 'src/songs/song.model';
import { Genre } from 'src/genres/genre.model';

@Injectable()
export class SongGenresService {
  constructor(
    @InjectModel(SongGenre)
    private songGenreModel: typeof SongGenre,
  ) {}

  async createSongGenre(dto: CreateSongGenreDto): Promise<SongGenre> {
    return this.songGenreModel.create(dto);
  }

  async getAllSongGenres(): Promise<SongGenre[]> {
    return this.songGenreModel.findAll();
  }

  async getSongGenreById(id: number): Promise<SongGenre> {
    const songGenre = await this.songGenreModel.findByPk(id);
    if (!songGenre) {
      throw new NotFoundException('Song-Genre relation not found');
    }
    return songGenre;
  }

  async updateSongGenre(id: number, dto: UpdateSongGenreDto): Promise<SongGenre> {
    const songGenre = await this.getSongGenreById(id);
    await songGenre.update(dto);
    return songGenre;
  }

  async deleteSongGenre(id: number): Promise<void> {
    const songGenre = await this.getSongGenreById(id);
    await songGenre.destroy();
  }
}
