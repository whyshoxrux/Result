import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Enrollment } from './enrollment.model';
import { Payments } from '../payments/payment.model';
import { Courses } from '../course/course.model';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectModel(Enrollment)
    private readonly enrollmentModel: typeof Enrollment,
  ) {}

  async create(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
    try {
      return await this.enrollmentModel.create(createEnrollmentDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create enrollment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createMany(createEnrollmentDto: CreateEnrollmentDto[]) {
    try {
      console.log(createEnrollmentDto);

      const result = [];
      for (const el of createEnrollmentDto) {
        const enrollment = await this.enrollmentModel.create(el);
        result.push(enrollment);
      }

      return result;
    } catch (error) {
      throw new HttpException(
        'Failed to create enrollments',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Enrollment[]> {
    try {
      const enrollments = await this.enrollmentModel.findAll({
        include: [{ model: Payments }, { model: Courses }],
      });

      if (!enrollments.length) {
        throw new NotFoundException('No enrollments found');
      }

      return enrollments;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch enrollments',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Enrollment> {
    try {
      const enrollment = await this.enrollmentModel.findByPk(id);
      if (!enrollment) {
        throw new NotFoundException(`Enrollment with ID ${id} not found`);
      }
      return enrollment;
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch enrollment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateEnrollmentDto: UpdateEnrollmentDto,
  ): Promise<Enrollment> {
    try {
      const enrollment = await this.findOne(id);
      return await enrollment.update(updateEnrollmentDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update enrollment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const enrollment = await this.findOne(id);
      await enrollment.destroy();
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete enrollment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
