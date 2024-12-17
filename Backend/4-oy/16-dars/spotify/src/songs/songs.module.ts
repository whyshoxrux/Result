import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Song } from './song.model';

@Module({
  imports: [SequelizeModule.forFeature([Song])],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
