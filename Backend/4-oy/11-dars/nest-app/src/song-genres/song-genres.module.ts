import { Module } from '@nestjs/common';
import { SongGenresService } from './song-genres.service';
import { SongGenresController } from './song-genres.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SongGenres } from './song-genres.model';
import { Song } from 'src/songs/songs.model';
import { Genres } from 'src/genres/genres.model';

@Module({
  imports: [SequelizeModule.forFeature([SongGenres, Song, Genres])],
  controllers: [SongGenresController],
  providers: [SongGenresService],
})
export class SongGenresModule {}
