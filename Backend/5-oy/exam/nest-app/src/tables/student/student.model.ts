import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Groups } from 'src/tables/groups/group.model';
import { Homework } from '../homework/homework.model';
import { Enrollment } from '../enrollment/enrollment.model';

@Table({ tableName: 'students' })
export class Student extends Model<Student> {
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
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_active: boolean;

  @ForeignKey(() => Groups)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  group_id: number;

  @Column({
    type: DataType.STRING,
    defaultValue: 'student',
  })
  role: 'student';

  @BelongsTo(() => Groups)
  group: Groups;

  @HasMany(() => Homework)
  homeworks: Homework[];

  @HasMany(() => Enrollment)
  enrollments: Enrollment[];
}
