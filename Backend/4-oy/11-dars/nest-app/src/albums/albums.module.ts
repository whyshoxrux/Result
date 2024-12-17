import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Album } from './album.model';
import { Artists } from 'src/artists/artists.model';
import { Song } from 'src/songs/songs.model';

@Module({
  imports: [SequelizeModule.forFeature([Album, Artists, Song])],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
