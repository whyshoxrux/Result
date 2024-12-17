import {
  Table,
  Model,
  Column,
  DataType,
  AllowNull,
} from 'sequelize-typescript';

@Table({ tableName: 'videos' })
export class Video extends Model<Video> {
  @Column({
    type: DataType.STRING,
  })
  video: string;
}
