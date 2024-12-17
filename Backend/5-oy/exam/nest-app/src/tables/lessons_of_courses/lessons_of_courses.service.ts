import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLessonsOfCourseDto } from './dto/create-lessons_of_course.dto';
import { UpdateLessonsOfCourseDto } from './dto/update-lessons_of_course.dto';
import { LessonsOfCourses } from './model';
import { Homework } from '../homework/homework.model';
import { Courses } from '../course/course.model';
import { Video } from '../videos/videos.model';

@Injectable()
export class LessonsOfCoursesService {
  constructor(
    @InjectModel(LessonsOfCourses)
    private readonly lessonsOfCoursesModel: typeof LessonsOfCourses,
  ) {}

  async create(
    createLessonsOfCourseDto: CreateLessonsOfCourseDto,
  ): Promise<LessonsOfCourses> {
    try {
      return await this.lessonsOfCoursesModel.create(createLessonsOfCourseDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create lesson',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createMany(
    createLessonsOfCourseDto: CreateLessonsOfCourseDto[],
  ): Promise<LessonsOfCourses[]> {
    try {
      const result = [];
      for (const dto of createLessonsOfCourseDto) {
        const lesson = await this.lessonsOfCoursesModel.create(dto);
        result.push(lesson);
      }
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create multiple lessons',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<LessonsOfCourses[]> {
    try {
      const lessons = await this.lessonsOfCoursesModel.findAll({
        include: [{ model: Homework }, { model: Courses }, { model: Video }],
      });
      if (!lessons.length) {
        throw new NotFoundException('No lessons found');
      }
      return lessons;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch lessons',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<LessonsOfCourses> {
    try {
      const lesson = await this.lessonsOfCoursesModel.findByPk(id);
      if (!lesson) {
        throw new NotFoundException(`Lesson with ID ${id} not found`);
      }
      return lesson;
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to fetch lesson with ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateLessonsOfCourseDto: UpdateLessonsOfCourseDto,
  ): Promise<LessonsOfCourses> {
    try {
      const lesson = await this.findOne(id);
      return await lesson.update(updateLessonsOfCourseDto);
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to update lesson with ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const lesson = await this.findOne(id);
      await lesson.destroy();
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to delete lesson with ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
