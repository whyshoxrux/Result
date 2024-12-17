import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from './student.model';
import { Groups } from 'src/tables/groups/group.model';
import { Homework } from '../homework/homework.model';
import { Enrollment } from '../enrollment/enrollment.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Student, Groups, Homework, Enrollment])
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
