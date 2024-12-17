import {
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { PlaylistSong } from 'src/playlist-songs/playlist-song.model';
import { Song } from 'src/songs/song.model';
import { User } from 'src/users/user.model';

@Table({ tableName: 'playlists' })
export class Playlist extends Model<Playlist> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    user_id: number;
    @BelongsTo(() => User)
    owner

    @BelongsToMany(() => Song, () => PlaylistSong)
    songs: Song[];

}
