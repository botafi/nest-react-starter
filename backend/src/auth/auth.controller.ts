import { User as UserEntity } from './user.entity';
import { Get, Controller, Post, Body, UseGuards, Delete, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.param.decorator';
import { JwtAuthGuard } from './jwtAuth.guard';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Put()
    login(
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        return this.authService.loginEmail(email, password);
    }

    @Post()
    register(
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        return this.authService.createUserEmail(email, password);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    logout(
        @User() user: UserEntity,
    ) {
        return this.authService.logout(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    session(
        @User() user: UserEntity,
    ) {
        return user;
    }
}
