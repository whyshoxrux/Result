import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Album } from './album.model';

@Module({
  imports: [SequelizeModule.forFeature([Album])],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
