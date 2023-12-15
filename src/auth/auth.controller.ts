import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    register(@Body() registerDto: RegisterDto): Promise<any> {
        try {
            return this.authService.register(registerDto);
        } catch (err) {
            throw err;
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('logout')
    async logout() {
        try {
            return { message: 'Logout successful' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
