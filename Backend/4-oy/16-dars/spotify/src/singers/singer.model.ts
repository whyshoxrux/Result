import {
    Column,
    DataType,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { Album } from 'src/albums/album.model';

@Table({ tableName: 'singers' })
export class Singer extends Model<Singer> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    bio: string;

    @HasMany(() => Album)
    albums: Album[];
}
