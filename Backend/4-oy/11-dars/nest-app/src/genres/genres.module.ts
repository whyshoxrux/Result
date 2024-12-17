import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Genres } from './genres.model';
import { Song } from 'src/songs/songs.model';

@Module({
  imports: [SequelizeModule.forFeature([Genres, Song])],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
