import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'userss' })
export class User extends Model<User> {
  @Column({
    type: DataTypes.STRING,
  })
  username: string;
}
