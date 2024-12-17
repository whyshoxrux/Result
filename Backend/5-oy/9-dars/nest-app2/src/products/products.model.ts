import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'products' })
export class Product extends Model<Product> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;
}
