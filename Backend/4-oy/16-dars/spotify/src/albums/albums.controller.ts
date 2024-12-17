import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { RoleGuard } from 'src/common/guard/role.guard';
import { Roles } from 'src/common/guard/roles.decorator';

@Controller('album')
export class AlbumsController {
  constructor(private albumService: AlbumsService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Roles('admin')
  async createAlbum(@Body() dto: CreateAlbumDto) {
    return this.albumService.createAlbum(dto);
  }

  @Get()
  async getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param('id') id: number) {
    return this.albumService.getAlbumById(id);
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  @Roles('admin')
  async updateAlbum(
    @Param('id') id: number,
    @Body() dto: UpdateAlbumDto,
  ) {
    return this.albumService.updateAlbum(id, dto);
  }

  @Delete(':id')
  async deleteAlbum(@Param('id') id: number) {
    return this.albumService.deleteAlbum(id);
  }
}
