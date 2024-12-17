import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Ism kirgizilishi shart!' })
  first_name: string;

  @IsString()
  @IsNotEmpty({ message: 'Familiya kirgizilishi shart!' })
  second_name: string;

  @IsEmail({}, { message: "Emailni to'g'ri kirgizing" })
  email: string;

  @IsString()
  @MinLength(6, {
    message: 'Parol eng kamida 6 ta raqamdan iborat bo\'lishi kerak',
  })
  password: string;
}
