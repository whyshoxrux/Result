import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStaffDto {
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

  @IsNumber()
  group_id: number;

  @IsEnum(['teacher', 'admin']) // ENUM qiymatlari to'g'ri berilgan
  @IsNotEmpty()
  role: 'teacher' | 'admin'; // role tipi aniq ko'rsatilgan
}
