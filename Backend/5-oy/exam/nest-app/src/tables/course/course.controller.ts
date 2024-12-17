import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Roles } from 'src/common/auth/role.decorator';
import { RoleGuard } from 'src/common/auth/role.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Roles('teacher')
  @UseGuards(RoleGuard)
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Post('many')
  @Roles('admin', 'teacher')
  @UseGuards(RoleGuard)
  createAll(@Body() createCourseDto: CreateCourseDto[]) {
    return this.courseService.createMany(createCourseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Put(':id')
  @Roles('teacher')
  @UseGuards(RoleGuard)
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  @Roles('teacher')
  @UseGuards(RoleGuard)
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
