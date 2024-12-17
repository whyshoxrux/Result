import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Playlist } from './playlist.model';

@Module({
  imports: [SequelizeModule.forFeature([Playlist])],
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
})
export class PlaylistsModule {}
