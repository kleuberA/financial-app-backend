import { Body, Controller, HttpStatus, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { CreateCategory } from './DTO/create-category.dto';
import { CategoryService } from './category.service';
import { Response } from 'express';
import { LocalAuthGuard } from 'src/auth/guard/local-auth-guard';

@Controller('api/v1/category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @UseGuards(LocalAuthGuard)
    @Post("create")
    async createCategory(@Body() category: CreateCategory, @Res() res: Response) {
        try {
            await this.categoryService.createCategory(category);
            return res.status(HttpStatus.OK).json({ message: "Categoria criada com sucesso!" })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "Ocorreu um erro ao criar uma categoria!", error: true, errorMessage: error.message })
        }
    }

    @IsPublic()
    @Patch("update")
    async updateCategory(@Body() category, @Res() res: Response) {
        try {
            await this.categoryService.updateCategory(category);
            return res.status(HttpStatus.OK).json({ message: "Categoria atualizada com sucesso!" });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "Erro ao atualizar a categoria!", error: error.message });
        }
    }
}
