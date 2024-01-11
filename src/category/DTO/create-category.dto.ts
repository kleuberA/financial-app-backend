import { IsString, MaxLength, MinLength } from "class-validator";
import { Category } from "../entities/category.entity";

export class CreateCategory extends Category {

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @IsString()
    userId: string;
}