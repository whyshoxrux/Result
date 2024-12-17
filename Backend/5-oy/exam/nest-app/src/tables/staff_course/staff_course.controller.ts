import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StaffCourseService } from './staff_course.service';
import { CreateStaffCourseDto } from './dto/create-staff_course.dto';
import { UpdateStaffCourseDto } from './dto/update-staff_course.dto';

@Controller('staff-course')
export class StaffCourseController {
  constructor(private readonly staffCourseService: StaffCourseService) {}

  @Post()
  create(@Body() createStaffCourseDto: CreateStaffCourseDto) {
    return this.staffCourseService.create(createStaffCourseDto);
  }

  @Post('many')
  createAll(@Body() createStaffCourse: CreateStaffCourseDto[]){
    return this.staffCourseService.createMany(createStaffCourse)
  }

  @Get()
  findAll() {
    return this.staffCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffCourseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaffCourseDto: UpdateStaffCourseDto) {
    return this.staffCourseService.update(+id, updateStaffCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffCourseService.remove(+id);
  }
}
