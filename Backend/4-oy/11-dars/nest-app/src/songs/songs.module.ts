import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Song } from './songs.model';
import { Album } from 'src/albums/album.model';
import { Genres } from 'src/genres/genres.model';
import { SongGenres } from 'src/song-genres/song-genres.model';
import { Playlists } from 'src/playlists/playlists.model';
import { PlaylistSong } from 'src/playlistsongs/playlistsongs.model';

@Module({
  imports: [SequelizeModule.forFeature([Song, Album, Genres, SongGenres, Playlists, PlaylistSong])],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
