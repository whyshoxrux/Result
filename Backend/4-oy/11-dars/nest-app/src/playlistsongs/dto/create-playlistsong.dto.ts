import { IsInt } from 'class-validator';

export class CreatePlaylistsongDto {
  @IsInt()
  playlistId: number;

  @IsInt()
  songId: number;
}
