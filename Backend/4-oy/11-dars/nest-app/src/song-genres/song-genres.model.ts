import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Genres } from 'src/genres/genres.model';
import { Song } from 'src/songs/songs.model';

@Table({ tableName: 'song-genres' })
export class SongGenres extends Model<SongGenres> {
  @ForeignKey(() => Song)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  song_id: number;


  @ForeignKey(() => Genres)

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  genre_id: number;
}
