import { Module } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { HomeworkController } from './homework.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Homework } from './homework.model';
import { Student } from 'src/tables/student/student.model';
import { LessonsOfCourses } from 'src/tables/lessons_of_courses/model';

@Module({
  imports: [SequelizeModule.forFeature([Homework]), Student, LessonsOfCourses],
  controllers: [HomeworkController],
  providers: [HomeworkService],
})
export class HomeworkModule {}
