import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistSongDto } from './create-playlist-song.dto';

export class UpdatePlaylistSongDto extends PartialType(CreatePlaylistSongDto) {}
