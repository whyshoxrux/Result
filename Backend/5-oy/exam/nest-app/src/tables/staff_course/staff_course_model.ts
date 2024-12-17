import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Courses } from 'src/tables/course/course.model';
import { Staff } from '../staff/staff.model';

@Table({ tableName: 'staff_coure' })
export class StaffCourse extends Model<StaffCourse> {
  @ForeignKey(() => Staff)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  staff_id: number;

  @ForeignKey(() => Courses)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  course_id: number;

}
