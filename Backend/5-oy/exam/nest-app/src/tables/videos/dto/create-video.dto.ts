import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateVideoDto {
  video: string;

  @IsNumber()
  @IsNotEmpty()
  lesson_id: number
}
