import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserDTO } from './DTO/CreateUser';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('api/v1/user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post("/create")
    createUser(@Body() createUser: CreateUserDTO, @Res() response: Response) {
        try {
            this.userService.createUser(createUser);
            return response.send({
                message: "Usuário criado com sucesso!",
            })
        }
        catch (error) {
            return response.status(400).send({
                message: error.message,
            })
        }
    }

}
