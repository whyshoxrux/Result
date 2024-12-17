import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSongDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsNumber()
    @IsNotEmpty()
    duration: number

    @IsNumber()
    @IsNotEmpty()
    album_id: number
}
