import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { StaffCourse } from '../staff_course/staff_course_model';
import { LessonsOfCourses } from '../lessons_of_courses/model';
import { Enrollment } from '../enrollment/enrollment.model';
import { Staff } from '../staff/staff.model';

@Table({ tableName: 'course' })
export class Courses extends Model<Courses> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  course_name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  data_period: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  daily_duration: string;

  @BelongsToMany(() => Staff, () => StaffCourse)
  staff: Staff[];

  @HasMany(() => LessonsOfCourses)
  lessonOfCourses: LessonsOfCourses[]

  @HasMany(() => Enrollment)
  enrollments: Enrollment[]
}
