import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSongGenresDto {
  @IsNumber()
  @IsNotEmpty()
  song_id: number;

  @IsNumber()
  @IsNotEmpty()
  genre_id: number;
}
