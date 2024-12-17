import { Module } from '@nestjs/common';
import { LessonsOfCoursesService } from './lessons_of_courses.service';
import { LessonsOfCoursesController } from './lessons_of_courses.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LessonsOfCourses } from './model';
import { Courses } from 'src/tables/course/course.model';
import { Homework } from '../homework/homework.model';
import { Video } from '../videos/videos.model';

@Module({
  imports: [SequelizeModule.forFeature([LessonsOfCourses]), Courses, Homework, Video],
  controllers: [LessonsOfCoursesController],
  providers: [LessonsOfCoursesService],
})
export class LessonsOfCoursesModule {}
