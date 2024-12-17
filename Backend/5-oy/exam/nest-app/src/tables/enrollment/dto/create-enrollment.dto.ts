import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEnrollmentDto {
  @IsNumber()
  @IsNotEmpty()
  course_id: number;

  @IsNumber()
  @IsNotEmpty()
  student_id: number;

  @IsString()
  @IsNotEmpty()
  start_date: string;

  @IsString()
  @IsNotEmpty()
  end_date: string;
}
