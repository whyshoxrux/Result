import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateDoctorDto {
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    second_name: string;

    @IsArray()
    @IsOptional()
    patient_id: string[];
}
