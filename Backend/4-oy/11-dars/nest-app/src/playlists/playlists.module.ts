import { Module } from '@nestjs/common';
import { PlaylistService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Playlists } from './playlists.model';
import { Song } from 'src/songs/songs.model';
import { PlaylistSong } from 'src/playlistsongs/playlistsongs.model';

@Module({
  imports: [SequelizeModule.forFeature([Playlists, Song, PlaylistSong])],
  controllers: [PlaylistsController],
  providers: [PlaylistService],
})
export class PlaylistsModule {}
