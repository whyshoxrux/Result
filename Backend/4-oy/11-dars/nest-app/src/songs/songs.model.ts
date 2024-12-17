import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Album } from "src/albums/album.model";
import { Genres } from "src/genres/genres.model";
import { Playlists } from "src/playlists/playlists.model";
import { PlaylistSong } from "src/playlistsongs/playlistsongs.model";
import { SongGenres } from "src/song-genres/song-genres.model";

@Table({tableName: 'songs'})
export class Song extends Model<Song>{
        @Column({
            type: DataType.STRING,
            allowNull: false
        })
        title: string

        @Column({
            type: DataType.STRING,
            allowNull: false
        })
        duration: string


        @ForeignKey(() => Album)

        @Column({
            type: DataType.INTEGER,
            allowNull: false
        })
        album_id: number

        @BelongsTo(()=> Album)
        album: Album

        @BelongsToMany(() => Genres, ()=> SongGenres)
        genres: Genres[]

        @BelongsToMany(() => Playlists, () => PlaylistSong)
        playlists: Playlists[]

}