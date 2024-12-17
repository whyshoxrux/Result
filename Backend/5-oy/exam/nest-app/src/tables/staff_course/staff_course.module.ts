import { Module } from '@nestjs/common';
import { StaffCourseService } from './staff_course.service';
import { StaffCourseController } from './staff_course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StaffCourse } from './staff_course_model';
import { Courses } from 'src/tables/course/course.model';

@Module({
  imports: [SequelizeModule.forFeature([StaffCourse]), Courses],
  controllers: [StaffCourseController],
  providers: [StaffCourseService],
})
export class StaffCourseModule {}
