import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  patient_name: string;

  @IsArray()
  @IsOptional()
  doctor_id: string[];
}
