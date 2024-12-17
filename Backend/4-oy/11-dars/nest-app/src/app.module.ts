import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { SongsModule } from './songs/songs.module';
import { GenresModule } from './genres/genres.module';
import { SongGenresModule } from './song-genres/song-genres.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { PlaylistsongsModule } from './playlistsongs/playlistsongs.module';

@Module({
  imports: [
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      database: 'postgres',
      username: 'postgres',
      password: '123456',
      host: '127.0.0.1',
      port: 5432,
      autoLoadModels: true,
      synchronize: true,
    }),
    ArtistsModule,
    AlbumsModule,
    SongsModule,
    GenresModule,
    SongGenresModule,
    PlaylistsModule,
    PlaylistsongsModule,
  ],
})
export class AppModule {}
