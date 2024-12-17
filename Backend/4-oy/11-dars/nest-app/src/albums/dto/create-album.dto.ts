import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAlbumDto {
    @IsString()
    @IsNotEmpty()
    title: string; 
    
    
    @IsString()
    @IsNotEmpty()
    releaseDate: string;

    @IsNumber()
    @IsNotEmpty()
    artistId: number; //foreign key qilishim kk
}



