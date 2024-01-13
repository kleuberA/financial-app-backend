import { Module } from '@nestjs/common';
import { DespesasService } from './despesas.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DespesasController } from './despesas.controller';

@Module({
  controllers: [DespesasController],
  providers: [DespesasService, PrismaService]
})
export class DespesasModule { }
