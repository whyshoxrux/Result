import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistsongDto } from './create-playlistsong.dto';

export class UpdatePlaylistsongDto extends PartialType(CreatePlaylistsongDto) {}
