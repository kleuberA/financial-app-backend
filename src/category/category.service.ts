import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategory } from './DTO/create-category.dto';
import { UpdateCategory } from './DTO/update-category.dto';
import { DeleteCategory } from './DTO/delete-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) { }

    async getCategories() {
        return await this.prisma.category.findMany();
    }

    async createCategory(category: CreateCategory) {
        const userExist = await this.prisma.user.findMany({
            where: {
                id: category.id
            }
        })

        if (!userExist) {
            throw new BadRequestException("Usuário não encontrado!");
        }

        await this.prisma.category.create({
            data: {
                name: category.name,
                userId: category.userId
            }
        })
    }

    async updateCategory(category: UpdateCategory) {

        const categoryExist = await this.prisma.category.findFirst({
            where: {
                id: category.categoryId
            }
        })

        if (!categoryExist) {
            throw new BadRequestException("Essa categoria não existe!");
        }

        await this.prisma.category.update({
            where: {
                id: category.categoryId
            },
            data: {
                name: category.name
            }
        })
    }

    async deleteCategory(category: DeleteCategory) {
        const categoryExist = await this.prisma.category.findFirst({
            where: {
                id: category.id
            }
        })

        if (!categoryExist) {
            throw new BadRequestException("Essa categoria não existe!");
        }

        await this.prisma.category.delete({
            where: {
                id: category.id
            }
        })
    }
}
