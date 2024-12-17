import {
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { Playlist } from 'src/playlists/playlist.model';
import { Song } from 'src/songs/song.model';

@Table({ tableName: 'PlaylistSongs' })
export class PlaylistSong extends Model<PlaylistSong> {
    @ForeignKey(() => Playlist)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    playlist_id: number;

    @ForeignKey(() => Song)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    song_id: number;
}

