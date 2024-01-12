import { IsString, MaxLength, MinLength } from "class-validator";
import { Category } from "../entities/category.entity";

export class UpdateCategory extends Category {

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @IsString()
    categoryId: string;
}