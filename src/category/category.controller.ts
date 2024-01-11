import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateCategory } from './DTO/create-category.dto';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { Response } from 'express';
import { CategoryService } from './category.service';

@Controller('api/v1/category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @IsPublic()
    @Post("create")
    async createCategory(@Body() category: CreateCategory, @Res() res: Response) {
        try {
            await this.categoryService.createCategory(category);
            return res.status(HttpStatus.OK).json({ message: "Category criada com sucesso!" })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "Ocorreu um erro ao criar uma category!", error: true, errorMessage: error.message })
        }
    }
}
