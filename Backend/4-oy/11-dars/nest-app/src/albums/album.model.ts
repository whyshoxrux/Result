import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Artists } from 'src/artists/artists.model';
import { Song } from 'src/songs/songs.model';

@Table({ tableName: 'albums' })
export class Album extends Model<Album> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  releaseDate: string;

  @ForeignKey(() => Artists)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  artist_id: number;

  @BelongsTo(() => Artists)
  artist: Artists;


  @HasMany(() => Song)
  songs: Song[];
}
