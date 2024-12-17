import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Video } from './videos.model';
import { LessonsOfCourses } from '../lessons_of_courses/model';

@Module({
  imports: [SequelizeModule.forFeature([Video]), LessonsOfCourses],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
