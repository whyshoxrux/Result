import { IsNotEmpty, IsString } from "class-validator";

export class CreateSingerDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    bio: string
}
