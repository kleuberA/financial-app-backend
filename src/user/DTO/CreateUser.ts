import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"
import { User } from "../entities/User.entity"

export class CreateUserDTO extends User {

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name: string

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8, { message: "A senha deverá conter no mínimo 8 caracteres!" })
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Senha muito fraca.',
    })
    password: string;
}