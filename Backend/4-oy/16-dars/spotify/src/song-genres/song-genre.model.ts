import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { Genre } from 'src/genres/genre.model';
import { Song } from 'src/songs/song.model';

@Table({ tableName: 'SongGenres' })
export class SongGenre extends Model<SongGenre> {
    @ForeignKey(() => Song)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    song_id: number;

    @ForeignKey(() => Genre)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    genre_id: number;
}

