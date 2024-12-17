import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  course_name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  date_perion: string;

  @IsString()
  @IsNotEmpty()
  end_duration: string;
}
