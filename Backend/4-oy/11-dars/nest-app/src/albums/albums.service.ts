import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Album } from './album.model';
import { Song } from 'src/songs/songs.model';

@Injectable()
export class AlbumsService {
  constructor(@InjectModel(Album) private AlbumModel: typeof Album) {}

  async create(newAlbom) {
    const result = await this.AlbumModel.create(newAlbom);
    return result;
  }

  async findAll() {
    const result = await this.AlbumModel.findAll({include: {model: Song, attributes: ["title", "duration"]}});
    return result;
  }

  async findOne(id: number): Promise<Album> {
    const user = await this.AlbumModel.findOne({ where: { id } });
    
    return user;
  }

  async update(id: number, updateUserDto: UpdateAlbumDto){
    const user = await this.AlbumModel.findByPk(id); 
    await user.update(updateUserDto); 
    return user;
  }

  async destroy(id: number){
    const user = await this.AlbumModel.findByPk(id);
    await user.destroy(); 
    return 'Siz eng zo\'risiz🫡'
  }
}


