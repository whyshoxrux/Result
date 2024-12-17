import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePlaylistSongDto {
  @IsNumber()
  @IsNotEmpty()
  playlist_id: number;

  @IsNumber()
  @IsNotEmpty()
  song_id: number;
}
