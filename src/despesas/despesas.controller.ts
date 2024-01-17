import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { LocalAuthGuard } from 'src/auth/guard/local-auth-guard';
import { CreateDespesas } from './dto/create-despesas.dto';
import { DespesasService } from './despesas.service';
import { Response } from 'express';

@Controller('api/v1/despesas')
export class DespesasController {
    constructor(private readonly despesasService: DespesasService) { }

    @UseGuards(LocalAuthGuard)
    @Get("allDespesas")
    async getAllDespesas(@Res() res: Response) {
        try {
            const despesas = await this.despesasService.getAllDespesas();
            return res.status(HttpStatus.OK).json({ message: "Despesas encontradas!", despesas });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "Ocorreu um erro ao buscar todas despesa!", error: error.message })
        }
    }

    @UseGuards(LocalAuthGuard)
    @Post("create")
    async createDespesas(@Body() despesas: CreateDespesas, @Res() res: Response) {
        try {
            await this.despesasService.createDespesas(despesas);
            return res.status(HttpStatus.OK).json({ message: "Despesas criada com sucesso!" })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "Ocorreu um erro ao criar uma despesa!", error: error.message })
        }
    }

    @UseGuards(LocalAuthGuard)
    @Delete("delete/:id")
    async deleteDespesas(@Param() params, @Res() res: Response) {
        try {
            await this.despesasService.deleteDespesas(params.id as string);
            return res.status(HttpStatus.OK).json({ message: "Despesas deletada com sucesso!" })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "Ocorreu um erro ao deletar uma despesa!", error: error.message })
        }
    }

    @UseGuards(LocalAuthGuard)
    @Patch("update/:id")
    async updateDespesas(@Param() params, @Body() despesas, @Res() res: Response) {
        try {
            await this.despesasService.updateDespesas(params.id as string, despesas);
            return res.status(HttpStatus.OK).json({ message: "Despesas atualizada com sucesso!" })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "Ocorreu um erro ao atualizar uma despesa!", error: error.message })
        }
    }
}
