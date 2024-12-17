import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
import { Courses } from '../course/course.model';
import { Groups } from '../groups/group.model';
import { StaffCourse } from '../staff_course/staff_course_model';

@Table({ tableName: 'staff' })
export class Staff extends Model<Staff> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM('teacher', 'admin'),
    allowNull: false,
  })
  role: 'teacher' | 'admin';

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_active: boolean;

  @ForeignKey(() => Groups) 
  @Column({
    type: DataType.INTEGER,
    allowNull: true, 
  })
  groupId: number; 

  @BelongsTo(() => Groups)
  group: Groups; 

  @BelongsToMany(() => Courses, () => StaffCourse)
  courses: Courses[];
}
