import { IsString, MaxLength, MinLength } from "class-validator";
import { Despesas } from "../entities/despesas.entity";

export class CreateDespesas extends Despesas {
    id: string;

    @IsString()
    @MinLength(5)
    @MaxLength(25)
    name: string;

    @IsString()
    @MinLength(5)
    @MaxLength(200)
    descricao: string;

    @IsString()
    valor: string;

    @IsString()
    categoriaId: string;
}

