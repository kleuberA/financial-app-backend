import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { Bcrypt } from './lib/Bcrypt';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, Bcrypt],
})
export class AppModule { }
