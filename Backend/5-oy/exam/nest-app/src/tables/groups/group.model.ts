import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Student } from '../student/student.model';
import { Staff } from '../staff/staff.model';

@Table({ tableName: 'groups' })
export class Groups extends Model<Groups> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  group_type: string;

  @HasMany(() => Student)
  students: Student[];

  @HasMany(() => Staff)
  staff: Staff[]; 
}
