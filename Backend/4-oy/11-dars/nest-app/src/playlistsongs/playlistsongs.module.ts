import { Module } from '@nestjs/common';
import { PlaylistsongsService } from './playlistsongs.service';
import { PlaylistsongsController } from './playlistsongs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlaylistSong } from './playlistsongs.model';
import { Playlists } from 'src/playlists/playlists.model';
import { Song } from 'src/songs/songs.model';


@Module({
  imports: [SequelizeModule.forFeature([PlaylistSong, Playlists, Song])],
  controllers: [PlaylistsongsController],
  providers: [PlaylistsongsService],
})
export class PlaylistsongsModule {}
