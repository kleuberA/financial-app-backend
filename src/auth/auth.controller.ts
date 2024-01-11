import { AuthService } from './auth.service';
import {
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthRequest } from './dto/AuthRequest';
import { IsPublic } from './decorators/ispublic.decorator';
import { LocalAuthGuard } from './guard/local-auth-guard';

@Controller('/api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(@Request() req: AuthRequest) {
        return this.authService.login(req.user);
    }
}
