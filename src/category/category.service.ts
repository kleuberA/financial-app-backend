import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategory } from './DTO/create-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) { }

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
}
