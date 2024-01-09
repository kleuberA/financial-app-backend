import { Body, Controller, Delete, Param, Post, Res } from '@nestjs/common';
import { CreateUserDTO } from './DTO/CreateUser';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('api/v1/user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post("/create")
    async createUser(@Body() createUser: CreateUserDTO, @Res() response: Response) {
        try {
            let user = await this.userService.createUser(createUser);
            return response.status(201).json({ message: 'Usuário criado com sucesso!', success: true, user });
        } catch (error) {
            return response.status(400).json({ message: error.message, error: true });
        }
    }

    @Delete("/delete/:id")
    async deleteUser(@Param() params, @Res() response: Response) {
        try {
            await this.userService.deleteUser(params.id as string);
            return response.status(201).json({ message: 'Usuário deletado com sucesso!', success: true });
        } catch (error) {
            return response.status(400).json({ message: error.message, error: true });
        }
    }
}
