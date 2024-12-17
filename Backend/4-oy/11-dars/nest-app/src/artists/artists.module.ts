import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Artists } from './artists.model';
import { Album } from 'src/albums/album.model';

@Module({
  imports: [SequelizeModule.forFeature([Artists, Album])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
