import {
    Column,
    DataType,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { Playlist } from 'src/playlists/playlist.model';

@Table({ tableName: 'user' })
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.ENUM('user', 'admin'),
        allowNull: false,
    })
    role: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    is_activ: boolean;

    @HasMany(() => Playlist)
    playlists
}


