import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Playlists } from 'src/playlists/playlists.model';
import { Song } from 'src/songs/songs.model';

@Table({ tableName: 'playlist_songs' })
export class PlaylistSong extends Model<PlaylistSong> {
  @ForeignKey(() => Playlists)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  playlistId: number;

  @ForeignKey(() => Song)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  songId: number;
}
