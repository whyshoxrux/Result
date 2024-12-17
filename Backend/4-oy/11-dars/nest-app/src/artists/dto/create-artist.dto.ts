import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateArtistDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    bio: string;
}
