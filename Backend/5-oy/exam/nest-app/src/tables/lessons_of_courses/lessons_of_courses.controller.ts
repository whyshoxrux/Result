import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LessonsOfCoursesService } from './lessons_of_courses.service';
import { CreateLessonsOfCourseDto } from './dto/create-lessons_of_course.dto';
import { UpdateLessonsOfCourseDto } from './dto/update-lessons_of_course.dto';
import { Roles } from 'src/common/auth/role.decorator';
import { RoleGuard } from 'src/common/auth/role.guard';

@Controller('lessons-of-courses')
export class LessonsOfCoursesController {
  constructor(
    private readonly lessonsOfCoursesService: LessonsOfCoursesService,
  ) {}

  @Post()
  @Roles('teacher')
  @UseGuards(RoleGuard)
  create(@Body() createLessonsOfCourseDto: CreateLessonsOfCourseDto) {
    return this.lessonsOfCoursesService.create(createLessonsOfCourseDto);
  }

  @Post('many')
  @Roles('teacher')
  @UseGuards(RoleGuard)
  createAll(@Body() createLessonsOfCourseDto: CreateLessonsOfCourseDto[]) {
    return this.lessonsOfCoursesService.createMany(createLessonsOfCourseDto);
  }

  @Get()
  @Roles('teacher')
  @UseGuards(RoleGuard)
  findAll() {
    return this.lessonsOfCoursesService.findAll();
  }

  @Get(':id')
  @Roles('teacher')
  @UseGuards(RoleGuard)
  findOne(@Param('id') id: string) {
    return this.lessonsOfCoursesService.findOne(+id);
  }

  @Patch(':id')
  @Roles('teacher')
  @UseGuards(RoleGuard)
  update(
    @Param('id') id: string,
    @Body() updateLessonsOfCourseDto: UpdateLessonsOfCourseDto,
  ) {
    return this.lessonsOfCoursesService.update(+id, updateLessonsOfCourseDto);
  }

  @Delete(':id')
  @Roles('teacher')
  @UseGuards(RoleGuard)
  remove(@Param('id') id: string) {
    return this.lessonsOfCoursesService.remove(+id);
  }
}
