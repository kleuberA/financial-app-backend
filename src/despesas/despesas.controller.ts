import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { CreateDespesas } from './dto/create-despesas.dto';
import { DespesasService } from './despesas.service';

@Controller('api/v1/despesas')
export class DespesasController {
    constructor(private readonly despesasService: DespesasService) { }

    @IsPublic()
    @Post("create")
    async createDespesas(@Body() despesas: CreateDespesas, @Res() res: Response) {
        try {
            await this.despesasService.createDespesas(despesas);
            return res.status(HttpStatus.OK).json({ message: "Despesas criada com sucesso!" })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "Ocorreu um erro ao criar uma despesa!", error: error.message })
        }
    }

}
