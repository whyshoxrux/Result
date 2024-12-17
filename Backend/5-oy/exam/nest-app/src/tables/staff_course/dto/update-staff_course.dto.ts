import { PartialType } from '@nestjs/mapped-types';
import { CreateStaffCourseDto } from './create-staff_course.dto';

export class UpdateStaffCourseDto extends PartialType(CreateStaffCourseDto) {}
