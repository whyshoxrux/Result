import { BelongsTo, BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { PlaylistSong } from "src/playlistsongs/playlistsongs.model";
import { Song } from "src/songs/songs.model";

@Table({tableName: 'playlists'})
export class Playlists extends Model<Playlists>{
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_id: number

    @BelongsToMany(() => Song, () => PlaylistSong)
    songs: Song[]
}