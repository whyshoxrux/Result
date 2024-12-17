import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePlaylistDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    user_id: number;
}
