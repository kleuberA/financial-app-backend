import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { Bcrypt } from './lib/Bcrypt';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth-guard';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';
import { DespesasController } from './despesas/despesas.controller';
import { DespesasModule } from './despesas/despesas.module';
import { DespesasService } from './despesas/despesas.service';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, CategoryModule, DespesasModule],
  controllers: [AppController, UserController, DespesasController],
  providers: [AppService, UserService, Bcrypt, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }, CategoryService, DespesasService],
})
export class AppModule { }
