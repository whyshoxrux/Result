import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Homework } from './homework.model';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { LessonsOfCourses } from '../lessons_of_courses/model';
import { Student } from '../student/student.model';

@Injectable()
export class HomeworkService {
  constructor(
    @InjectModel(Homework)
    private readonly homeworkModel: typeof Homework,
  ) {}

  async create(createHomeworkDto: CreateHomeworkDto): Promise<Homework> {
    try {
      return await this.homeworkModel.create(createHomeworkDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create homework',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createMany(
    createHomeworkDto: CreateHomeworkDto[],
  ): Promise<Homework[]> {
    try {
      console.log(createHomeworkDto);

      const result = [];
      for (const el of createHomeworkDto) {
        const homework = await this.homeworkModel.create(el);
        result.push(homework);
      }

      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create multiple homework entries',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Homework[]> {
    try {
      const homeworks = await this.homeworkModel.findAll({
        include: [{ model: LessonsOfCourses }, { model: Student }],
      });

      if (!homeworks.length) {
        throw new NotFoundException('No homework entries found');
      }

      return homeworks;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch homework entries',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Homework> {
    try {
      const homework = await this.homeworkModel.findByPk(id);
      if (!homework) {
        throw new NotFoundException(`Homework with ID ${id} not found`);
      }
      return homework;
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to fetch homework with ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateHomeworkDto: UpdateHomeworkDto,
  ): Promise<Homework> {
    try {
      const homework = await this.findOne(id);
      return await homework.update(updateHomeworkDto);
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to update homework with ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const homework = await this.findOne(id);
      await homework.destroy();
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to delete homework with ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
