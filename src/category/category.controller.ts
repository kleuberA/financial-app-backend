import { Body, Controller, Delete, Get, HttpStatus, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guard/local-auth-guard';
import { CreateCategory } from './DTO/create-category.dto';
import { DeleteCategory } from './DTO/delete-category.dto';
import { UpdateCategory } from './DTO/update-category.dto';
import { CategoryService } from './category.service';
import { Response } from 'express';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';

@Controller('api/v1/category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @IsPublic()
    @Get("categories")
    async getCategories(@Res() res: Response) {
        try {
            const categories = await this.categoryService.getCategories();
            return res.status(HttpStatus.OK).json({ message: "Categorias encontradas com sucesso!", categories });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "Erro ao buscar as categorias!", error: error.message });
        }
    }

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

    @UseGuards(LocalAuthGuard)
    @Patch("update")
    async updateCategory(@Body() category: UpdateCategory, @Res() res: Response) {
        try {
            await this.categoryService.updateCategory(category);
            return res.status(HttpStatus.OK).json({ message: "Categoria atualizada com sucesso!" });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "Erro ao atualizar a categoria!", error: error.message });
        }
    }

    @UseGuards(LocalAuthGuard)
    @Delete("delete")
    async deleteCategory(@Body() category: DeleteCategory, @Res() res: Response) {
        try {
            await this.categoryService.deleteCategory(category);
            return res.status(HttpStatus.OK).json({ message: "Categoria deletada com sucesso!" });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "Erro ao deletar a categoria!", error: error.message });
        }
    }
}
