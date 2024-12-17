import { IsNotEmpty, IsString } from "class-validator";

export class CreateAfterDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    bio:string;

    @IsNotEmpty()
    @IsString()
    book_id:string

}
