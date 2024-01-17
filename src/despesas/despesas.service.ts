import { Injectable } from '@nestjs/common';
import { CreateDespesas } from './dto/create-despesas.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DespesasService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllDespesas() {

        let allDespesas = await this.prisma.despesas.findMany({
            include: {
                category: true,
            }
        })

        const totalDespesas = allDespesas.reduce((total, item) => {
            const valor = parseInt(item.value);
            return total + (isNaN(valor) ? 0 : valor);
        }, 0);

        return { allDespesas, totalDespesas }
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

    async deleteDespesas(id: string) {

        let existDespesa = await this.prisma.despesas.findMany({
            where: {
                id
            }
        })

        if (!existDespesa) {
            throw new Error("Despesa não existe!")
        }

        await this.prisma.despesas.delete({
            where: {
                id
            }
        })
    }

}
