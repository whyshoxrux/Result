import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Enrollment } from '../enrollment/enrollment.model';

@Table({ tableName: 'payments' })
export class Payments extends Model<Payments> {
  @Column({
    type: DataType.ENUM('cash', 'card'), // Enum values directly inside DataType.ENUM
    allowNull: false,
  })
  payment_method: 'cash' | 'card'; // Specify the possible values

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  status: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  total_amount: number;

  @ForeignKey(() => Enrollment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  enrollment_id: number;

  @BelongsTo(() => Enrollment)
  enrollments: Enrollment[]
}
