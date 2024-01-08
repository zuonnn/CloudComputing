import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto, @Res() res: Response): Promise<any> {
    const response = await this.authService.register(registerDto);
    return res.status(HttpStatus.CREATED).json(response);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<any> {
    const user = await this.authService.login(loginDto, res);
    return res.status(HttpStatus.OK).json({ user });
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    try {
      res.clearCookie('authentication', {
        httpOnly: true,
        path: '/',
      });
      return res.status(HttpStatus.OK).send();
    } catch (error) {
      throw new HttpException(
        'Logout failed ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
