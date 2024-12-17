import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;

  @IsNumber()
  @IsNotEmpty()
  group_id: number;
}
