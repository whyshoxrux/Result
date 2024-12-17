import {
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
    Model,
    Table,
} from 'sequelize-typescript';
import { Singer } from 'src/singers/singer.model';

@Table({ tableName: 'albums' })
export class Album extends Model<Album> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    releaseDate: Date;

    @ForeignKey(() => Singer)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    artist_id: number;

    @BelongsTo(() => Singer)
    singer: Singer;
}
