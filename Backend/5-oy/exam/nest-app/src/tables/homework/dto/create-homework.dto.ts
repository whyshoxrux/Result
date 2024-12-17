import { IsNotEmpty, IsNumber, IsDate, Min, Max } from 'class-validator';

export class CreateHomeworkDto {
  @IsNumber()
  @IsNotEmpty()
  student_id: number;

  @IsNumber()
  @IsNotEmpty()
  lesson_of_course_id: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(100)
  ball: number;

  @IsDate()
  @IsNotEmpty()
  deadline: Date;
}
 