import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Album } from './album.model';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Singer } from 'src/singers/singer.model';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Album)
    private albumModel: typeof Album,
  ) {}

  async createAlbum(dto: CreateAlbumDto) {
    return this.albumModel.create(dto);
  }

  async getAllAlbums(): Promise<Album[]> {
    return this.albumModel.findAll({
      include: [
        { model: Singer, attributes: ['name', 'bio'] }
      ]
    });
  }

  async getAlbumById(id: number) {
    const album = await this.albumModel.findByPk(id, {
      include: [
        { model: Singer, attributes: ['name', 'bio'] }
      ]
    });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async updateAlbum(id: number, dto: UpdateAlbumDto): Promise<[number, Album[]]> {
    const [updatedRows, [updatedAlbum]] = await this.albumModel.update(dto, {
      where: { id },
      returning: true,
    });

    if (updatedRows === 0) {
      throw new NotFoundException('Album not found');
    }

    return [updatedRows, [updatedAlbum]];
  }

  async deleteAlbum(id: number): Promise<void> {
    const album = await this.getAlbumById(id);
    await album.destroy();
  }
}
