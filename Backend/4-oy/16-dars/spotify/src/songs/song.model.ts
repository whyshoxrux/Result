import {
    BelongsToMany,
    Column,
    DataType,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { Genre } from 'src/genres/genre.model';
import { PlaylistSong } from 'src/playlist-songs/playlist-song.model';
import { Playlist } from 'src/playlists/playlist.model';
import { SongGenre } from 'src/song-genres/song-genre.model';

@Table({ tableName: 'songs' })
export class Song extends Model<Song> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    duration: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    album_id: number;

    @BelongsToMany(() => Playlist, () => PlaylistSong)
    playlists: Playlist[];

    @BelongsToMany(() => Genre, () => SongGenre)
    genres: Genre[];
}

