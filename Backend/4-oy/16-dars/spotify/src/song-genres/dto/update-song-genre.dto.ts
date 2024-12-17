import { PartialType } from '@nestjs/mapped-types';
import { CreateSongGenreDto } from './create-song-genre.dto';

export class UpdateSongGenreDto extends PartialType(CreateSongGenreDto) {}
