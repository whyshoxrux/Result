import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { SongGenres } from 'src/song-genres/song-genres.model';
import { Song } from 'src/songs/songs.model';

@Table({ tableName: 'genres' })
export class Genres extends Model<Genres> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => Song, () => SongGenres)
  song: Song[]

}