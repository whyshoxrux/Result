import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Enrollment } from './enrollment.model';
import { Courses } from 'src/tables/course/course.model';
import { Student } from 'src/tables/student/student.model';
import { Payments } from '../payments/payment.model';

@Module({
  imports: [SequelizeModule.forFeature([Enrollment]), Courses, Student, Payments],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
