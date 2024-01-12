import { IsString } from "class-validator";
import { Category } from "../entities/category.entity";

export class DeleteCategory extends Category {
    @IsString()
    id: string;
}