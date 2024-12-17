import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { SingersService } from './singers.service';
import { CreateSingerDto } from './dto/create-singer.dto';
import { UpdateSingerDto } from './dto/update-singer.dto';
import { RoleGuard } from 'src/common/guard/role.guard';
import { Roles } from 'src/common/guard/roles.decorator';

@Controller('singer')
export class SingersController {
  constructor(private singerService: SingersService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Roles('admin')
  async createSinger(@Body() dto: CreateSingerDto) {
    return this.singerService.createSinger(dto);
  }

  @Get()
  async getAllSingers() {
    return this.singerService.getAllSingers();
  }

  @Get(':id')
  async getSingerById(@Param('id') id: number) {
    return this.singerService.getSingerById(id);
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  @Roles('admin')
  async updateSinger(
    @Param('id') id: number,
    @Body() dto: UpdateSingerDto,
  ) {
    return this.singerService.updateSinger(id, dto);
  }

  @Delete(':id')
  async deleteSinger(@Param('id') id: number) {
    return this.singerService.deleteSinger(id);
  }
}
