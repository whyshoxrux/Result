import { Module } from '@nestjs/common';
import { PlaylistSongsService } from './playlist-songs.service';
import { PlaylistSongsController } from './playlist-songs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlaylistSong } from './playlist-song.model';

@Module({
  imports: [SequelizeModule.forFeature([PlaylistSong])],
  controllers: [PlaylistSongsController],
  providers: [PlaylistSongsService],
})
export class PlaylistSongsModule {}
