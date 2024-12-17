import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { Roles } from 'src/common/auth/role.decorator';
import { RoleGuard } from 'src/common/auth/role.guard';

@Controller('homework')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Post()
  @Roles('teacher')
  @UseGuards(RoleGuard)
  create(@Body() createHomeworkDto: CreateHomeworkDto) {
    return this.homeworkService.create(createHomeworkDto);
  }

  @Post('many')
  @Roles('teacher')
  @UseGuards(RoleGuard)
  createAll(@Body() createHomeworkDto: CreateHomeworkDto[]) {
    return this.homeworkService.createMany(createHomeworkDto);
  }

  @Get()
  findAll() {
    return this.homeworkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.homeworkService.findOne(+id);
  }

  @Put(':id')
  @Roles('teacher')
  @UseGuards(RoleGuard)
  update(
    @Param('id') id: string,
    @Body() updateHomeworkDto: UpdateHomeworkDto,
  ) {
    return this.homeworkService.update(+id, updateHomeworkDto);
  }

  @Delete(':id')
  @Roles('teacher')
  @UseGuards(RoleGuard)
  remove(@Param('id') id: string) {
    return this.homeworkService.remove(+id);
  }
}
