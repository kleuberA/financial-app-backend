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

@Module({
  imports: [AuthModule, UserModule, PrismaModule, CategoryModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, Bcrypt, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }, CategoryService,],
})
export class AppModule { }
