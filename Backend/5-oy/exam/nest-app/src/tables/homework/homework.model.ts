import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { LessonsOfCourses } from 'src/tables/lessons_of_courses/model';
import { Student } from 'src/tables/student/student.model';

@Table({ tableName: 'homeworks' })
export class Homework extends Model<Homework> {
  
  @ForeignKey(() => Student)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  student_id: number;

  @ForeignKey(() => LessonsOfCourses)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  lesson_of_course_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 100,
    },
  })
  ball: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  deadline: Date;


  @BelongsTo(() => LessonsOfCourses)
  lesson_of_courses: LessonsOfCourses[]

  @BelongsTo(() => Student)
  student: Student[]
}
