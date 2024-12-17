import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSongGenreDto {
  @IsNumber()
  @IsNotEmpty()
  song_id: number;

  @IsNumber()
  @IsNotEmpty()
  genre_id: number;
}
