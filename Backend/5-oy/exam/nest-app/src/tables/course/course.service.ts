import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Courses } from './course.model';
import { LessonsOfCourses } from '../lessons_of_courses/model';
import { Enrollment } from '../enrollment/enrollment.model';
import { Staff } from '../staff/staff.model';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Courses)
    private readonly courseModel: typeof Courses,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Courses> {
    try {
      return await this.courseModel.create(createCourseDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create course',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createMany(createCourseDto: CreateCourseDto[]) {
    try {
      console.log(createCourseDto);

      const result = [];
      for (const el of createCourseDto) {
        const product = await this.courseModel.create(el);
        result.push(product);
      }

      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create courses',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Courses[]> {
    try {
      const courses = await this.courseModel.findAll({
        include: [
          { model: Staff },
          { model: LessonsOfCourses },
          { model: Enrollment },
        ],
      });

      if (!courses.length) {
        throw new NotFoundException('No courses found');
      }

      return courses;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch courses',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Courses> {
    try {
      const course = await this.courseModel.findByPk(id);
      if (!course) {
        throw new NotFoundException(`Course with ID ${id} not found`);
      }
      return course;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch course',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Courses> {
    try {
      const course = await this.findOne(id);
      return await course.update(updateCourseDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update course',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const course = await this.findOne(id);
      await course.destroy();
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete course',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
