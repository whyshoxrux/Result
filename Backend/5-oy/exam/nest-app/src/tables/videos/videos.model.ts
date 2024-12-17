import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { LessonsOfCourses } from "../lessons_of_courses/model";

@Table({ tableName: 'videos' })
export class Video extends Model<Video> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  video: string;

  @ForeignKey(() => LessonsOfCourses)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  lesson_id: number;

  @BelongsTo(() => LessonsOfCourses)
  lessonsOfCourses: LessonsOfCourses[]
}
