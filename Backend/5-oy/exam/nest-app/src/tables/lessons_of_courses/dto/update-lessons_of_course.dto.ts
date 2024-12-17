import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonsOfCourseDto } from './create-lessons_of_course.dto';

export class UpdateLessonsOfCourseDto extends PartialType(CreateLessonsOfCourseDto) {}
