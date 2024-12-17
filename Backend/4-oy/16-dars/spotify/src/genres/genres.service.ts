import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Genre } from './genre.model';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Song } from 'src/songs/song.model';

@Injectable()
export class GenresService {
  constructor(
    @InjectModel(Genre)
    private genreModel: typeof Genre,
  ) { }

  async createGenre(dto: CreateGenreDto): Promise<Genre> {
    return this.genreModel.create(dto);
  }

  async getAllGenres(): Promise<Genre[]> {
    return this.genreModel.findAll({
      include: [
        {
          model: Song,
          attributes: ['title', 'duration'],
          through: { attributes: [] }
        },
      ],
    });
  }


  async getGenreById(id: number): Promise<Genre> {
    const genre = await this.genreModel.findByPk(id, {
      include: [
        {
          model: Song,
          attributes: ['title', 'duration'],
          through: { attributes: [] }
        },
      ]
    });
    if (!genre) {
      throw new NotFoundException('Genre not found');
    }
    return genre;
  }

  async updateGenre(id: number, dto: UpdateGenreDto): Promise<Genre> {
    const genre = await this.getGenreById(id);
    await genre.update(dto);
    return genre;
  }

  async deleteGenre(id: number): Promise<void> {
    const genre = await this.getGenreById(id);
    await genre.destroy();
  }
}
