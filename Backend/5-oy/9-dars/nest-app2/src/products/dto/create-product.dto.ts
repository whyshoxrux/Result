import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string


    @IsNotEmpty()
    @IsNumber()
    user_id: number
}
