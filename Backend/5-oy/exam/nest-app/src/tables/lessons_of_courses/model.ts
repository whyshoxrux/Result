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
import { Homework } from '../homework/homework.model';
import { Video } from '../videos/videos.model';

@Table({ tableName: 'lessons_of_courses' })
export class LessonsOfCourses extends Model<LessonsOfCourses> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lesson: string;

  @ForeignKey(() => Courses)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  course_id: number;

  @HasMany(() => Homework)
  hoomeworks: Homework[]

  @BelongsTo(() => Courses)
  course: Courses[]

  // @ForeignKey(() => Video)
  @HasMany(() => Video)
  videos: Video[]
}
