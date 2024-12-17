import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSongDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    duration: string

    @IsNumber()
    @IsNotEmpty()
    album_id: number
}
