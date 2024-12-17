import { IsBoolean, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ForeignKey } from 'sequelize-typescript';
import { Enrollment } from 'src/tables/enrollment/enrollment.model';

export class CreatePaymentDto {
  @IsEnum(['cash', 'card']) // Corrected usage of @IsEnum with the array
  @IsNotEmpty()
  payment_method: 'cash' | 'card'; // Specify the possible values

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @IsNumber()
  @IsNotEmpty()
  total_amount: number;

  @ForeignKey(() => Enrollment)
  @IsNumber()
  @IsNotEmpty()
  enrollment_id: number;
}
