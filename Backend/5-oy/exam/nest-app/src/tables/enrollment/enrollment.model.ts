import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Courses } from 'src/tables/course/course.model';
import { Student } from 'src/tables/student/student.model';
import { Payments } from '../payments/payment.model';

@Table({ tableName: 'enrollment' })
export class Enrollment extends Model<Enrollment> {
  @ForeignKey(() => Courses)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  course_id: number;

  @ForeignKey(() => Student)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  student_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  start_date: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  end_date: string;

  @HasMany(() => Payments)
  payments: Payments[]

  @BelongsTo(() => Courses)
  course: Courses[]

  @BelongsTo(() => Student)
  student: Student
}
