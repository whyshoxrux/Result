import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateLessonsOfCourseDto {
  @IsString()
  @IsNotEmpty()
  lesson: string;

  @IsNumber()
  @IsNotEmpty()
  course_id: number;
}
