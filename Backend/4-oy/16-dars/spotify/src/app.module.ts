import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SingersModule } from './singers/singers.module';
import { AlbumsModule } from './albums/albums.module';
import { GenresModule } from './genres/genres.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { SongGenresModule } from './song-genres/song-genres.module';
import { PlaylistSongsModule } from './playlist-songs/playlist-songs.module';
import { SongsModule } from './songs/songs.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharingModule } from './common/sharing.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    UsersModule,
    SingersModule,
    AlbumsModule,
    GenresModule,
    PlaylistsModule,
    SongsModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      username: 'postgres',
      password: '123456',
      autoLoadModels: true,
      synchronize: true,
    }),
    SongGenresModule,
    PlaylistSongsModule,
    SharingModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'songs'),
      serveRoot: '/static',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
