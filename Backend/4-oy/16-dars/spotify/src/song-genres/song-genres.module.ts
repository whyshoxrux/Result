import { Module } from '@nestjs/common';
import { SongGenresService } from './song-genres.service';
import { SongGenresController } from './song-genres.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SongGenre } from './song-genre.model';

@Module({
  imports: [SequelizeModule.forFeature([SongGenre])],
  controllers: [SongGenresController],
  providers: [SongGenresService],
})
export class SongGenresModule {}
