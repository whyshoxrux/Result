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
import { SongGenre } from 'src/song-genres/song-genre.model';
import { Song } from 'src/songs/song.model';

@Table({ tableName: 'genres' })
export class Genre extends Model<Genre> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @BelongsToMany(() => Song, () => SongGenre)
    songs: Song[];

}
