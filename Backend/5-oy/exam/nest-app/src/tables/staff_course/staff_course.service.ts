import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStaffCourseDto } from './dto/create-staff_course.dto';
import { UpdateStaffCourseDto } from './dto/update-staff_course.dto';
import { StaffCourse } from './staff_course_model';

@Injectable()
export class StaffCourseService {
  constructor(
    @InjectModel(StaffCourse)
    private readonly staffCourseModel: typeof StaffCourse,
  ) {}

  async create(
    createStaffCourseDto: CreateStaffCourseDto,
  ): Promise<StaffCourse> {
    try {
      return await this.staffCourseModel.create(createStaffCourseDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create staff course',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createMany(
    createProductDto: CreateStaffCourseDto[],
  ): Promise<StaffCourse[]> {
    try {
      const result = [];
      for (const el of createProductDto) {
        const product = await this.staffCourseModel.create(el);
        result.push(product);
      }
      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create multiple staff course records',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<StaffCourse[]> {
    try {
      const staffCourses = await this.staffCourseModel.findAll();
      if (!staffCourses.length) {
        throw new NotFoundException('No staff courses found');
      }
      return staffCourses;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve staff courses',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<StaffCourse> {
    try {
      const staffCourse = await this.staffCourseModel.findByPk(id);
      if (!staffCourse) {
        throw new NotFoundException(`StaffCourse with ID ${id} not found`);
      }
      return staffCourse;
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to retrieve staff course with ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateStaffCourseDto: UpdateStaffCourseDto,
  ): Promise<StaffCourse> {
    try {
      const staffCourse = await this.findOne(id);
      return await staffCourse.update(updateStaffCourseDto);
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to update staff course with ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const staffCourse = await this.findOne(id);
      await staffCourse.destroy();
    } catch (error) {
      throw new HttpException(
        error.message || `Failed to delete staff course with ID ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
