import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Singer } from './singer.model';
import { CreateSingerDto } from './dto/create-singer.dto';
import { UpdateSingerDto } from './dto/update-singer.dto';
import { Album } from 'src/albums/album.model';

@Injectable()
export class SingersService {
  constructor(
    @InjectModel(Singer)
    private singerModel: typeof Singer,
  ) {}

  async createSinger(dto: CreateSingerDto): Promise<Singer> {
    return this.singerModel.create(dto);
  }

  async getAllSingers(): Promise<Singer[]> {
    return this.singerModel.findAll({
      include: [
        { model: Album, attributes: ['title', 'releaseDate'] }
      ]
    });
  }

  async getSingerById(id: number): Promise<Singer> {
    const singer = await this.singerModel.findByPk(id, {
      include: [
        { model: Album, attributes: ['title', 'releaseDate'] }
      ]
    });
    if (!singer) {
      throw new NotFoundException('Singer not found');
    }
    return singer;
  }

  async updateSinger(id: number, dto: UpdateSingerDto): Promise<[number, Singer[]]> {
    const [updatedRows, [updatedSinger]] = await this.singerModel.update(dto, {
      where: { id },
      returning: true,
    });

    if (updatedRows === 0) {
      throw new NotFoundException('Singer not found');
    }

    return [updatedRows, [updatedSinger]];
  }

  async deleteSinger(id: number): Promise<void> {
    const singer = await this.getSingerById(id);
    await singer.destroy();
  }
}
