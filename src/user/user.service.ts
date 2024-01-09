import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { CreateUserDTO } from './DTO/CreateUser';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async createUser(user: CreateUserDTO): Promise<User> {

        const userExist = await this.prisma.user.findUnique({
            where: {
                email: user.email
            }
        })

        if (userExist) {
            throw new BadRequestException("Usuário já esta cadastrado!");
        }

        let userData = await this.prisma.user.create({
            data: {
                ...user,
                password: await bcrypt.hash(user.password, 10)
            }
        })

        delete userData.password;
        return userData;
    }

}
