import { BadRequestException, Injectable } from '@nestjs/common';
import prisma from 'src/lib/prisma';
import { CreateUserDTO } from './DTO/CreateUser';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {


    async findUnique(email) {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        return user;
    }

    async createUser(createUser: CreateUserDTO): Promise<User> {

        try {
            const userExist = await prisma.user.findUnique({
                where: { email: createUser.email },
            })

            if (userExist) {
                throw new BadRequestException("Usuário não encontrado!");
            }

            const hashPassword = await bcrypt.hash(createUser.password, 10);

            const user = await prisma.user.create({
                data: {
                    ...createUser,
                    password: hashPassword
                },
            });

            delete user.password
            return user;
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

}
