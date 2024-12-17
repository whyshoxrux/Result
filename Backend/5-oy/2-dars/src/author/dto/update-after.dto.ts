import { PartialType } from '@nestjs/mapped-types';
import { CreateAfterDto } from './create-after.dto';

export class UpdateAfterDto extends PartialType(CreateAfterDto) {}
