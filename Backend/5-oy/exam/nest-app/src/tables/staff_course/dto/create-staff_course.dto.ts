import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStaffCourseDto {
  @IsNumber()
  @IsNotEmpty()
  staff_id: number;

  @IsNumber()
  @IsNotEmpty()
  course_id: number;
}
