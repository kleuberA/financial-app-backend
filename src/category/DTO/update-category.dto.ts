import { IsString, MaxLength, MinLength } from "class-validator";

export class UpdateCategory {

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @IsString()
    categoryId: string;
}