import { Module } from '@nestjs/common';
import { ControllerController } from './controller/controller.controller';
import { ServiceService } from './service/service.service';
import { ServiceService } from './auth/service/service.service';
import { AuthService } from './service/auth/auth.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [ControllerController, AuthController],
  providers: [ServiceService, AuthService]
})
export class AuthModule {}
