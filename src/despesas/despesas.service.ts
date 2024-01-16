import { Injectable } from '@nestjs/common';
import { CreateDespesas } from './dto/create-despesas.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DespesasService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllDespesas() {
        return await this.prisma.despesas.findMany({
            include: {
                category: true,
            }
        })
    }

    async createDespesas(despesas: CreateDespesas) {

        const existCategory = await this.prisma.category.findFirst({
            where: {
                id: despesas.categoriaId
            }
        })

        if (!existCategory) {
            throw new Error("Categoria não existe!")
        }

        await this.prisma.despesas.create({
            data: {
                name: despesas.name,
                description: despesas.descricao,
                value: despesas.valor,
                categoryId: despesas.categoriaId
            }
        })
    }

}
