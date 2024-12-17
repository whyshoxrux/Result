import { PartialType } from '@nestjs/mapped-types';
import { CreateSongGenresDto } from './create-song-genre.dto';

export class UpdateSongGenreDto extends PartialType(CreateSongGenresDto) {}
