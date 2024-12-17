import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { RoleGuard } from 'src/common/guard/role.guard';
import { Roles } from 'src/common/guard/roles.decorator';
import { diskStorage } from 'multer'
import { extname } from 'path'
import { FileInterceptor } from '@nestjs/platform-express';

const storage = diskStorage({
  destination: './songs',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    console.log(ext, uniqueSuffix, file.fieldname);
    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

@Controller('song')
export class SongsController {
  constructor(private songService: SongsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage }))
  @UseGuards(RoleGuard)
  @Roles('admin')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return {
      message: 'File uploaded successfully',
      filename: file.originalname,
    };
  }

  @Post()
  @UseGuards(RoleGuard)
  @Roles('admin')
  async createSong(@Body() dto: CreateSongDto): Promise<any> {
    return this.songService.createSong(dto);
  }

  @Get()
  async getAllSongs() {
    return this.songService.getAllSongs();
  }

  @Get(':id')
  async getSongById(@Param('id') id: number) {
    return this.songService.getSongById(id);
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  @Roles('admin')
  async updateSong(
    @Param('id') id: number,
    @Body() dto: UpdateSongDto,
  ) {
    return this.songService.updateSong(id, dto);
  }

  @Delete(':id')
  async deleteSong(@Param('id') id: number) {
    return this.songService.deleteSong(id);
  }
}
