import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Courses } from './course.model';
import { LessonsOfCourses } from '../lessons_of_courses/model';
import { Enrollment } from '../enrollment/enrollment.model';

@Module({
  imports: [SequelizeModule.forFeature([Courses]), LessonsOfCourses, Enrollment],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
